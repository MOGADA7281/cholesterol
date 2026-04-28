import { _adapters as t } from "chart.js";
import { toDate as a, parse as d, parseISO as c, isValid as u, format as f, addYears as o, addQuarters as y, addMonths as i, addWeeks as h, addDays as O, addHours as M, addMinutes as p, addSeconds as l, addMilliseconds as k, differenceInYears as w, differenceInQuarters as I, differenceInMonths as S, differenceInWeeks as q, differenceInDays as D, differenceInHours as W, differenceInMinutes as H, differenceInSeconds as Q, differenceInMilliseconds as Y, startOfYear as g, startOfQuarter as _, startOfMonth as P, startOfWeek as s, startOfDay as T, startOfHour as b, startOfMinute as A, startOfSecond as F, endOfYear as R, endOfQuarter as V, endOfMonth as j, endOfWeek as z, endOfDay as B, endOfHour as C, endOfMinute as E, endOfSecond as G } from "date-fns";
var J = { datetime: "MMM d, yyyy, h:mm:ss aaaa", millisecond: "h:mm:ss.SSS aaaa", second: "h:mm:ss aaaa", minute: "h:mm aaaa", hour: "ha", day: "MMM d", week: "PP", month: "MMM yyyy", quarter: "qqq - yyyy", year: "yyyy" };
t._date.override({ _id: "date-fns", formats: function () { return J; }, parse: function (e, r) { if (e === null || typeof e > "u")
        return null; let n = typeof e; return n === "number" || e instanceof Date ? e = a(e) : n === "string" && (typeof r == "string" ? e = d(e, r, new Date, this.options) : e = c(e, this.options)), u(e) ? e.getTime() : null; }, format: function (e, r) { return f(e, r, this.options); }, add: function (e, r, n) { switch (n) {
        case "millisecond": return k(e, r);
        case "second": return l(e, r);
        case "minute": return p(e, r);
        case "hour": return M(e, r);
        case "day": return O(e, r);
        case "week": return h(e, r);
        case "month": return i(e, r);
        case "quarter": return y(e, r);
        case "year": return o(e, r);
        default: return e;
    } }, diff: function (e, r, n) { switch (n) {
        case "millisecond": return Y(e, r);
        case "second": return Q(e, r);
        case "minute": return H(e, r);
        case "hour": return W(e, r);
        case "day": return D(e, r);
        case "week": return q(e, r);
        case "month": return S(e, r);
        case "quarter": return I(e, r);
        case "year": return w(e, r);
        default: return 0;
    } }, startOf: function (e, r, n) { switch (r) {
        case "second": return F(e);
        case "minute": return A(e);
        case "hour": return b(e);
        case "day": return T(e);
        case "week": return s(e);
        case "isoWeek": return s(e, { weekStartsOn: +n });
        case "month": return P(e);
        case "quarter": return _(e);
        case "year": return g(e);
        default: return e;
    } }, endOf: function (e, r) { switch (r) {
        case "second": return G(e);
        case "minute": return E(e);
        case "hour": return C(e);
        case "day": return B(e);
        case "week": return z(e);
        case "month": return j(e);
        case "quarter": return V(e);
        case "year": return R(e);
        default: return e;
    } } });
/*! Bundled license information:

chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.esm.js:
  (*!
   * chartjs-adapter-date-fns v3.0.0
   * https://www.chartjs.org
   * (c) 2022 chartjs-adapter-date-fns Contributors
   * Released under the MIT license
   *)
*/
