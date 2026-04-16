import Papa from "papaparse";

// ─── Types ───

export interface AffiliateOrder {
  orderId: string;
  productId: string;
  productName: string;
  skuId: string;
  price: number;
  paymentAmount: number;
  currency: string;
  quantity: number;
  returned: boolean;
  orderStatus: string;
  creatorUsername: string;
  contentType: "video" | "showcase";
  contentId: string;
  commissionModel: string;
  organicCommissionPct: number | null;
  organicCommissionBase: number | null;
  organicCommissionEst: number | null;
  organicCommissionReal: number | null;
  organicCommissionRealPay: number | null;
  paidCommissionPct: number | null;
  paidCommissionEst: number | null;
  paidCommissionReal: number | null;
  createdAt: Date;
  channel: "organic" | "paid";
}

export interface AffiliateStats {
  username: string;
  totalOrders: number;
  gmvTotal: number;
  gmvOrganic: number;
  gmvPaid: number;
  commissionTotal: number;
  uniqueVideos: number;
  returnRate: number;
  organicPct: number;
}

export interface VideoStats {
  contentId: string;
  username: string;
  contentType: "video" | "showcase";
  productName: string;
  totalOrders: number;
  gmv: number;
  commission: number;
}

export interface ProductStats {
  productName: string;
  productId: string;
  totalOrders: number;
  totalUnits: number;
  gmvTotal: number;
  organicOrders: number;
  paidOrders: number;
  uniqueAffiliates: number;
  commissionTotal: number;
}

export interface GlobalMetrics {
  totalOrders: number;
  gmvTotal: number;
  activeAffiliates: number;
  videosWithSales: number;
  commissionTotal: number;
  organicOrders: number;
  paidOrders: number;
}

export interface ParseResult {
  orders: AffiliateOrder[];
  affiliates: AffiliateStats[];
  videos: VideoStats[];
  products: ProductStats[];
  metrics: GlobalMetrics;
  skippedRows: number;
}

// ─── Column mapping (ES / EN) ───

const COL_MAP_ES: Record<string, string> = {
  "ID de pedido": "orderId",
  "ID de producto": "productId",
  "Nombre del producto": "productName",
  "ID de SKU": "skuId",
  "Precio": "price",
  "Importe del pago": "paymentAmount",
  "Moneda": "currency",
  "Cantidad": "quantity",
  "Devuelto o reembolsado en su totalidad": "returned",
  "Método de pago": "paymentMethod",
  "Estado del pedido": "orderStatus",
  "Nombre de usuario del creador": "creatorUsername",
  "Tipo de contenido": "contentType",
  "ID del contenido": "contentId",
  "commission model": "commissionModel",
  "Porcentaje de comisión estándar": "organicCommissionPct",
  "Base de comisión est.": "organicCommissionBase",
  "Pago de la comisión estándar estimada": "organicCommissionEst",
  "Base de comisión real": "organicCommissionReal",
  "Pago de comisión real": "organicCommissionRealPay",
  "Porcentaje de comisión de Anuncios de la tienda": "paidCommissionPct",
  "Pago de la comisión estimada de Anuncios de la tienda": "paidCommissionEst",
  "Pago de la comisión real de Anuncios de la tienda": "paidCommissionReal",
  "Fecha/hora de creación": "createdAt",
  "Platform": "platform",
};

const COL_MAP_EN: Record<string, string> = {
  "Order ID": "orderId",
  "Product ID": "productId",
  "Product Name": "productName",
  "SKU ID": "skuId",
  "Price": "price",
  "Payment Amount": "paymentAmount",
  "Currency": "currency",
  "Quantity": "quantity",
  "Fully returned or refunded": "returned",
  "Payment Method": "paymentMethod",
  "Order Status": "orderStatus",
  "Creator Username": "creatorUsername",
  "Content Type": "contentType",
  "Content ID": "contentId",
  "Commission Model": "commissionModel",
  "Standard Commission Rate": "organicCommissionPct",
  "Standard Commission Base": "organicCommissionBase",
  "Estimated Standard Commission Payment": "organicCommissionEst",
  "Actual Commission Base": "organicCommissionReal",
  "Actual Commission Payment": "organicCommissionRealPay",
  "Shop Ads Commission Rate": "paidCommissionPct",
  "Estimated Shop Ads Commission Payment": "paidCommissionEst",
  "Actual Shop Ads Commission Payment": "paidCommissionReal",
  "Creation Date/Time": "createdAt",
  "Platform": "platform",
};

// ─── Helpers ───

function parseNum(val: unknown): number | null {
  if (val === undefined || val === null || val === "") return null;
  const s = String(val).replace(/[€%\s]/g, "").replace(",", ".");
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function parsePct(val: unknown): number | null {
  if (val === undefined || val === null || val === "") return null;
  const s = String(val).replace("%", "").replace(",", ".").trim();
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function parseDate(val: unknown): Date {
  if (!val || val === "") return new Date(0);
  const s = String(val);
  // DD/MM/YYYY HH:MM:SS
  const m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5], +m[6]);
  return new Date(s);
}

// ─── Main parser ───

export function parseAffiliateCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: "UTF-8",
      complete(results) {
        try {
          const raw = results.data as Record<string, unknown>[];
          if (raw.length === 0) { reject(new Error("El archivo no contiene ordenes")); return; }

          // Detect language
          const firstRow = raw[0];
          const keys = Object.keys(firstRow);
          const isES = keys.some((k) => k.includes("ID de pedido"));
          const colMap = isES ? COL_MAP_ES : COL_MAP_EN;

          // Map columns
          function get(row: Record<string, unknown>, field: string): unknown {
            for (const [csv, mapped] of Object.entries(colMap)) {
              if (mapped === field) return row[csv];
            }
            return undefined;
          }

          let skippedRows = 0;
          const orders: AffiliateOrder[] = [];

          for (const row of raw) {
            const orderId = String(get(row, "orderId") ?? "").trim();
            if (!orderId) { skippedRows++; continue; }

            const organicPct = parsePct(get(row, "organicCommissionPct"));
            const paidPct = parsePct(get(row, "paidCommissionPct"));
            const channel: "organic" | "paid" = paidPct !== null ? "paid" : "organic";

            const contentTypeRaw = String(get(row, "contentType") ?? "").toLowerCase();
            const contentType: "video" | "showcase" = contentTypeRaw.includes("escaparate") || contentTypeRaw.includes("showcase") ? "showcase" : "video";

            const returnedRaw = String(get(row, "returned") ?? "").toLowerCase();

            orders.push({
              orderId,
              productId: String(get(row, "productId") ?? ""),
              productName: String(get(row, "productName") ?? ""),
              skuId: String(get(row, "skuId") ?? ""),
              price: parseNum(get(row, "price")) ?? 0,
              paymentAmount: parseNum(get(row, "paymentAmount")) ?? 0,
              currency: String(get(row, "currency") ?? "EUR"),
              quantity: parseNum(get(row, "quantity")) ?? 1,
              returned: returnedRaw === "sí" || returnedRaw === "si" || returnedRaw === "yes",
              orderStatus: String(get(row, "orderStatus") ?? ""),
              creatorUsername: String(get(row, "creatorUsername") ?? ""),
              contentType,
              contentId: String(get(row, "contentId") ?? ""),
              commissionModel: String(get(row, "commissionModel") ?? ""),
              organicCommissionPct: organicPct,
              organicCommissionBase: parseNum(get(row, "organicCommissionBase")),
              organicCommissionEst: parseNum(get(row, "organicCommissionEst")),
              organicCommissionReal: parseNum(get(row, "organicCommissionReal")),
              organicCommissionRealPay: parseNum(get(row, "organicCommissionRealPay")),
              paidCommissionPct: paidPct,
              paidCommissionEst: parseNum(get(row, "paidCommissionEst")),
              paidCommissionReal: parseNum(get(row, "paidCommissionReal")),
              createdAt: parseDate(get(row, "createdAt")),
              channel,
            });
          }

          // ─── Compute aggregates ───
          const affiliates = computeAffiliates(orders);
          const videos = computeVideos(orders);
          const products = computeProducts(orders);
          const metrics = computeMetrics(orders);

          resolve({ orders, affiliates, videos, products, metrics, skippedRows });
        } catch (e) {
          reject(e);
        }
      },
      error(err) { reject(new Error(`Error parseando CSV: ${err.message}`)); },
    });
  });
}

function computeAffiliates(orders: AffiliateOrder[]): AffiliateStats[] {
  const map = new Map<string, AffiliateOrder[]>();
  for (const o of orders) {
    const arr = map.get(o.creatorUsername) ?? [];
    arr.push(o);
    map.set(o.creatorUsername, arr);
  }

  return Array.from(map.entries()).map(([username, ords]) => {
    const uniqueOrders = new Set(ords.map((o) => o.orderId));
    const organicOrds = ords.filter((o) => o.channel === "organic");
    const paidOrds = ords.filter((o) => o.channel === "paid");
    const returned = ords.filter((o) => o.returned);
    const commission = ords.reduce((s, o) => s + (o.organicCommissionEst ?? 0) + (o.paidCommissionEst ?? 0), 0);
    const uniqueVideos = new Set(ords.map((o) => o.contentId));
    const total = uniqueOrders.size;

    return {
      username,
      totalOrders: total,
      gmvTotal: ords.reduce((s, o) => s + o.paymentAmount, 0),
      gmvOrganic: organicOrds.reduce((s, o) => s + o.paymentAmount, 0),
      gmvPaid: paidOrds.reduce((s, o) => s + o.paymentAmount, 0),
      commissionTotal: commission,
      uniqueVideos: uniqueVideos.size,
      returnRate: total > 0 ? returned.length / total : 0,
      organicPct: total > 0 ? organicOrds.length / ords.length : 0,
    };
  }).sort((a, b) => b.gmvTotal - a.gmvTotal);
}

function computeVideos(orders: AffiliateOrder[]): VideoStats[] {
  const map = new Map<string, AffiliateOrder[]>();
  for (const o of orders) {
    const arr = map.get(o.contentId) ?? [];
    arr.push(o);
    map.set(o.contentId, arr);
  }

  return Array.from(map.entries()).map(([contentId, ords]) => {
    const first = ords[0];
    const productCounts = new Map<string, number>();
    for (const o of ords) productCounts.set(o.productName, (productCounts.get(o.productName) ?? 0) + 1);
    const topProduct = Array.from(productCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";

    return {
      contentId,
      username: first.creatorUsername,
      contentType: first.contentType,
      productName: topProduct,
      totalOrders: ords.length,
      gmv: ords.reduce((s, o) => s + o.paymentAmount, 0),
      commission: ords.reduce((s, o) => s + (o.organicCommissionEst ?? 0) + (o.paidCommissionEst ?? 0), 0),
    };
  }).sort((a, b) => b.totalOrders - a.totalOrders);
}

function computeProducts(orders: AffiliateOrder[]): ProductStats[] {
  const map = new Map<string, AffiliateOrder[]>();
  for (const o of orders) {
    const key = o.productId;
    const arr = map.get(key) ?? [];
    arr.push(o);
    map.set(key, arr);
  }

  return Array.from(map.entries()).map(([productId, ords]) => {
    const uniqueAff = new Set(ords.map((o) => o.creatorUsername));
    return {
      productName: ords[0].productName,
      productId,
      totalOrders: ords.length,
      totalUnits: ords.reduce((s, o) => s + o.quantity, 0),
      gmvTotal: ords.reduce((s, o) => s + o.paymentAmount, 0),
      organicOrders: ords.filter((o) => o.channel === "organic").length,
      paidOrders: ords.filter((o) => o.channel === "paid").length,
      uniqueAffiliates: uniqueAff.size,
      commissionTotal: ords.reduce((s, o) => s + (o.organicCommissionEst ?? 0) + (o.paidCommissionEst ?? 0), 0),
    };
  }).sort((a, b) => b.totalOrders - a.totalOrders);
}

function computeMetrics(orders: AffiliateOrder[]): GlobalMetrics {
  const uniqueOrders = new Set(orders.map((o) => o.orderId));
  const uniqueAff = new Set(orders.map((o) => o.creatorUsername));
  const uniqueVideos = new Set(orders.map((o) => o.contentId));
  return {
    totalOrders: uniqueOrders.size,
    gmvTotal: orders.reduce((s, o) => s + o.paymentAmount, 0),
    activeAffiliates: uniqueAff.size,
    videosWithSales: uniqueVideos.size,
    commissionTotal: orders.reduce((s, o) => s + (o.organicCommissionEst ?? 0) + (o.paidCommissionEst ?? 0), 0),
    organicOrders: orders.filter((o) => o.channel === "organic").length,
    paidOrders: orders.filter((o) => o.channel === "paid").length,
  };
}

// ─── Helpers for UI ───

export function tiktokProfileUrl(username: string): string {
  return `https://www.tiktok.com/@${username}`;
}

export function tiktokVideoUrl(username: string, contentId: string): string {
  return `https://www.tiktok.com/@${username}/video/${contentId}`;
}

export function fmtEur(n: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
}

export function fmtPct(n: number): string {
  return `${(n * 100).toFixed(0)}%`;
}
