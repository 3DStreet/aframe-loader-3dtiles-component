import { CanvasTexture as Va, LinearFilter as ka, RepeatWrapping as ar, Frustum as ja, Matrix4 as Q, Group as en, PlaneGeometry as Ka, Vector3 as nt, MeshBasicMaterial as Qi, DoubleSide as za, Mesh as qi, ArrowHelper as Wa, Color as T, BoxGeometry as Xa, EdgesGeometry as Qa, LineSegments as qa, LineBasicMaterial as Ya, Vector2 as Yi, ShaderMaterial as $a, Euler as Fn, PerspectiveCamera as $i, OrthographicCamera as Za, BufferGeometry as tc, Float32BufferAttribute as cr, Uint8BufferAttribute as ur, BufferAttribute as ec, Points as nc } from "three";
import { GLTFLoader as sc } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader as rc } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader as ic } from "three/examples/jsm/loaders/KTX2Loader.js";
async function Re(e, t, n, s) {
  return s._parse(e, t, n, s);
}
function U(e, t) {
  if (!e)
    throw new Error(t || "loader assertion failed.");
}
const Cn = !!(typeof process != "object" || String(process) !== "[object process]" || process.browser), lr = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
lr && parseFloat(lr[1]);
function oc(e, t) {
  return Zi(e || {}, t);
}
function Zi(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  if (n > 3)
    return t;
  const s = {
    ...e
  };
  for (const [r, i] of Object.entries(t))
    i && typeof i == "object" && !Array.isArray(i) ? s[r] = Zi(s[r] || {}, t[r], n + 1) : s[r] = t[r];
  return s;
}
const ac = "latest";
function cc() {
  var e;
  return (e = globalThis._loadersgl_) !== null && e !== void 0 && e.version || (globalThis._loadersgl_ = globalThis._loadersgl_ || {}, globalThis._loadersgl_.version = "4.1.1"), globalThis._loadersgl_.version;
}
const to = cc();
function Lt(e, t) {
  if (!e)
    throw new Error(t || "loaders.gl assertion failed.");
}
const Bt = typeof process != "object" || String(process) !== "[object process]" || process.browser, Ds = typeof importScripts == "function", uc = typeof window < "u" && typeof window.orientation < "u", hr = typeof process < "u" && process.version && /v([0-9]*)/.exec(process.version);
hr && parseFloat(hr[1]);
class lc {
  constructor(t, n) {
    this.name = void 0, this.workerThread = void 0, this.isRunning = !0, this.result = void 0, this._resolve = () => {
    }, this._reject = () => {
    }, this.name = t, this.workerThread = n, this.result = new Promise((s, r) => {
      this._resolve = s, this._reject = r;
    });
  }
  postMessage(t, n) {
    this.workerThread.postMessage({
      source: "loaders.gl",
      type: t,
      payload: n
    });
  }
  done(t) {
    Lt(this.isRunning), this.isRunning = !1, this._resolve(t);
  }
  error(t) {
    Lt(this.isRunning), this.isRunning = !1, this._reject(t);
  }
}
class On {
  terminate() {
  }
}
const vn = /* @__PURE__ */ new Map();
function hc(e) {
  Lt(e.source && !e.url || !e.source && e.url);
  let t = vn.get(e.source || e.url);
  return t || (e.url && (t = fc(e.url), vn.set(e.url, t)), e.source && (t = eo(e.source), vn.set(e.source, t))), Lt(t), t;
}
function fc(e) {
  if (!e.startsWith("http"))
    return e;
  const t = dc(e);
  return eo(t);
}
function eo(e) {
  const t = new Blob([e], {
    type: "application/javascript"
  });
  return URL.createObjectURL(t);
}
function dc(e) {
  return `try {
  importScripts('${e}');
} catch (error) {
  console.error(error);
  throw error;
}`;
}
function no(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = n || /* @__PURE__ */ new Set();
  if (e) {
    if (fr(e))
      s.add(e);
    else if (fr(e.buffer))
      s.add(e.buffer);
    else if (!ArrayBuffer.isView(e)) {
      if (t && typeof e == "object")
        for (const r in e)
          no(e[r], t, s);
    }
  }
  return n === void 0 ? Array.from(s) : [];
}
function fr(e) {
  return e ? e instanceof ArrayBuffer || typeof MessagePort < "u" && e instanceof MessagePort || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas : !1;
}
const xn = () => {
};
class hs {
  static isSupported() {
    return typeof Worker < "u" && Bt || typeof On < "u" && !Bt;
  }
  constructor(t) {
    this.name = void 0, this.source = void 0, this.url = void 0, this.terminated = !1, this.worker = void 0, this.onMessage = void 0, this.onError = void 0, this._loadableURL = "";
    const {
      name: n,
      source: s,
      url: r
    } = t;
    Lt(s || r), this.name = n, this.source = s, this.url = r, this.onMessage = xn, this.onError = (i) => console.log(i), this.worker = Bt ? this._createBrowserWorker() : this._createNodeWorker();
  }
  destroy() {
    this.onMessage = xn, this.onError = xn, this.worker.terminate(), this.terminated = !0;
  }
  get isRunning() {
    return !!this.onMessage;
  }
  postMessage(t, n) {
    n = n || no(t), this.worker.postMessage(t, n);
  }
  _getErrorFromErrorEvent(t) {
    let n = "Failed to load ";
    return n += `worker ${this.name} from ${this.url}. `, t.message && (n += `${t.message} in `), t.lineno && (n += `:${t.lineno}:${t.colno}`), new Error(n);
  }
  _createBrowserWorker() {
    this._loadableURL = hc({
      source: this.source,
      url: this.url
    });
    const t = new Worker(this._loadableURL, {
      name: this.name
    });
    return t.onmessage = (n) => {
      n.data ? this.onMessage(n.data) : this.onError(new Error("No data received"));
    }, t.onerror = (n) => {
      this.onError(this._getErrorFromErrorEvent(n)), this.terminated = !0;
    }, t.onmessageerror = (n) => console.error(n), t;
  }
  _createNodeWorker() {
    let t;
    if (this.url) {
      const s = this.url.includes(":/") || this.url.startsWith("/") ? this.url : `./${this.url}`;
      t = new On(s, {
        eval: !1
      });
    } else if (this.source)
      t = new On(this.source, {
        eval: !0
      });
    else
      throw new Error("no worker");
    return t.on("message", (n) => {
      this.onMessage(n);
    }), t.on("error", (n) => {
      this.onError(n);
    }), t.on("exit", (n) => {
    }), t;
  }
}
class mc {
  static isSupported() {
    return hs.isSupported();
  }
  constructor(t) {
    this.name = "unnamed", this.source = void 0, this.url = void 0, this.maxConcurrency = 1, this.maxMobileConcurrency = 1, this.onDebug = () => {
    }, this.reuseWorkers = !0, this.props = {}, this.jobQueue = [], this.idleQueue = [], this.count = 0, this.isDestroyed = !1, this.source = t.source, this.url = t.url, this.setProps(t);
  }
  destroy() {
    this.idleQueue.forEach((t) => t.destroy()), this.isDestroyed = !0;
  }
  setProps(t) {
    this.props = {
      ...this.props,
      ...t
    }, t.name !== void 0 && (this.name = t.name), t.maxConcurrency !== void 0 && (this.maxConcurrency = t.maxConcurrency), t.maxMobileConcurrency !== void 0 && (this.maxMobileConcurrency = t.maxMobileConcurrency), t.reuseWorkers !== void 0 && (this.reuseWorkers = t.reuseWorkers), t.onDebug !== void 0 && (this.onDebug = t.onDebug);
  }
  async startJob(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (i, o, a) => i.done(a), s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : (i, o) => i.error(o);
    const r = new Promise((i) => (this.jobQueue.push({
      name: t,
      onMessage: n,
      onError: s,
      onStart: i
    }), this));
    return this._startQueuedJob(), await r;
  }
  async _startQueuedJob() {
    if (!this.jobQueue.length)
      return;
    const t = this._getAvailableWorker();
    if (!t)
      return;
    const n = this.jobQueue.shift();
    if (n) {
      this.onDebug({
        message: "Starting job",
        name: n.name,
        workerThread: t,
        backlog: this.jobQueue.length
      });
      const s = new lc(n.name, t);
      t.onMessage = (r) => n.onMessage(s, r.type, r.payload), t.onError = (r) => n.onError(s, r), n.onStart(s);
      try {
        await s.result;
      } catch (r) {
        console.error(`Worker exception: ${r}`);
      } finally {
        this.returnWorkerToQueue(t);
      }
    }
  }
  returnWorkerToQueue(t) {
    !Bt || this.isDestroyed || !this.reuseWorkers || this.count > this._getMaxConcurrency() ? (t.destroy(), this.count--) : this.idleQueue.push(t), this.isDestroyed || this._startQueuedJob();
  }
  _getAvailableWorker() {
    if (this.idleQueue.length > 0)
      return this.idleQueue.shift() || null;
    if (this.count < this._getMaxConcurrency()) {
      this.count++;
      const t = `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;
      return new hs({
        name: t,
        source: this.source,
        url: this.url
      });
    }
    return null;
  }
  _getMaxConcurrency() {
    return uc ? this.maxMobileConcurrency : this.maxConcurrency;
  }
}
const Ac = {
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: !0,
  onDebug: () => {
  }
};
class Ot {
  static isSupported() {
    return hs.isSupported();
  }
  static getWorkerFarm() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Ot._workerFarm = Ot._workerFarm || new Ot({}), Ot._workerFarm.setProps(t), Ot._workerFarm;
  }
  constructor(t) {
    this.props = void 0, this.workerPools = /* @__PURE__ */ new Map(), this.props = {
      ...Ac
    }, this.setProps(t), this.workerPools = /* @__PURE__ */ new Map();
  }
  destroy() {
    for (const t of this.workerPools.values())
      t.destroy();
    this.workerPools = /* @__PURE__ */ new Map();
  }
  setProps(t) {
    this.props = {
      ...this.props,
      ...t
    };
    for (const n of this.workerPools.values())
      n.setProps(this._getWorkerPoolProps());
  }
  getWorkerPool(t) {
    const {
      name: n,
      source: s,
      url: r
    } = t;
    let i = this.workerPools.get(n);
    return i || (i = new mc({
      name: n,
      source: s,
      url: r
    }), i.setProps(this._getWorkerPoolProps()), this.workerPools.set(n, i)), i;
  }
  _getWorkerPoolProps() {
    return {
      maxConcurrency: this.props.maxConcurrency,
      maxMobileConcurrency: this.props.maxMobileConcurrency,
      reuseWorkers: this.props.reuseWorkers,
      onDebug: this.props.onDebug
    };
  }
}
Ot._workerFarm = void 0;
function gc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = t[e.id] || {}, s = Bt ? `${e.id}-worker.js` : `${e.id}-worker-node.js`;
  let r = n.workerUrl;
  if (!r && e.id === "compression" && (r = t.workerUrl), t._workerType === "test" && (Bt ? r = `modules/${e.module}/dist/${s}` : r = `modules/${e.module}/src/workers/${e.id}-worker-node.ts`), !r) {
    let i = e.version;
    i === "latest" && (i = ac);
    const o = i ? `@${i}` : "";
    r = `https://unpkg.com/@loaders.gl/${e.module}${o}/dist/${s}`;
  }
  return Lt(r), r;
}
function pc(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : to;
  Lt(e, "no worker provided");
  const n = e.version;
  return !(!t || !n);
}
const Bc = {}, yc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Bc
}, Symbol.toStringTag, { value: "Module" })), Ln = {};
async function zt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  return t && (e = Cc(e, t, n, s)), Ln[e] = Ln[e] || Tc(e), await Ln[e];
}
function Cc(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!n.useLocalLibraries && e.startsWith("http"))
    return e;
  s = s || e;
  const r = n.modules || {};
  return r[s] ? r[s] : Bt ? n.CDN ? (Lt(n.CDN.startsWith("http")), `${n.CDN}/${t}@${to}/dist/libs/${s}`) : Ds ? `../src/libs/${s}` : `modules/${t}/src/libs/${s}` : `modules/${t}/dist/libs/${s}`;
}
async function Tc(e) {
  if (e.endsWith("wasm"))
    return await bc(e);
  if (!Bt)
    try {
      return yc && void 0;
    } catch (n) {
      return console.error(n), null;
    }
  if (Ds)
    return importScripts(e);
  const t = await _c(e);
  return Ec(t, e);
}
function Ec(e, t) {
  if (!Bt)
    return;
  if (Ds)
    return eval.call(globalThis, e), null;
  const n = document.createElement("script");
  n.id = t;
  try {
    n.appendChild(document.createTextNode(e));
  } catch {
    n.text = e;
  }
  return document.body.appendChild(n), null;
}
async function bc(e) {
  return await (await fetch(e)).arrayBuffer();
}
async function _c(e) {
  return await (await fetch(e)).text();
}
function wc(e, t) {
  return !Ot.isSupported() || !Bt && !(t != null && t._nodeWorkers) ? !1 : e.worker && (t == null ? void 0 : t.worker);
}
async function Mc(e, t, n, s, r) {
  const i = e.id, o = gc(e, n), c = Ot.getWorkerFarm(n).getWorkerPool({
    name: i,
    url: o
  });
  n = JSON.parse(JSON.stringify(n)), s = JSON.parse(JSON.stringify(s || {}));
  const u = await c.startJob("process-on-worker", Rc.bind(null, r));
  return u.postMessage("process", {
    input: t,
    options: n,
    context: s
  }), await (await u.result).result;
}
async function Rc(e, t, n, s) {
  switch (n) {
    case "done":
      t.done(s);
      break;
    case "error":
      t.error(new Error(s.error));
      break;
    case "process":
      const {
        id: r,
        input: i,
        options: o
      } = s;
      try {
        const a = await e(i, o);
        t.postMessage("done", {
          id: r,
          result: a
        });
      } catch (a) {
        const c = a instanceof Error ? a.message : "unknown error";
        t.postMessage("error", {
          id: r,
          error: c
        });
      }
      break;
    default:
      console.warn(`parse-with-worker unknown message ${n}`);
  }
}
function Ic(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? dr(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? dr(e, 0, t) : "";
}
function dr(e, t, n) {
  if (e.byteLength <= t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
function Sc(e) {
  try {
    return JSON.parse(e);
  } catch {
    throw new Error(`Failed to parse JSON from data starting with "${Ic(e)}"`);
  }
}
function Dc(e, t, n) {
  if (n = n || e.byteLength, e.byteLength < n || t.byteLength < n)
    return !1;
  const s = new Uint8Array(e), r = new Uint8Array(t);
  for (let i = 0; i < s.length; ++i)
    if (s[i] !== r[i])
      return !1;
  return !0;
}
function Fc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return Oc(t);
}
function Oc(e) {
  const t = e.map((i) => i instanceof ArrayBuffer ? new Uint8Array(i) : i), n = t.reduce((i, o) => i + o.byteLength, 0), s = new Uint8Array(n);
  let r = 0;
  for (const i of t)
    s.set(i, r), r += i.byteLength;
  return s.buffer;
}
function Fs(e, t, n) {
  const s = n !== void 0 ? new Uint8Array(e).subarray(t, t + n) : new Uint8Array(e).subarray(t);
  return new Uint8Array(s).buffer;
}
function Ie(e, t) {
  return U(e >= 0), U(t > 0), e + (t - 1) & ~(t - 1);
}
function vc(e, t, n) {
  let s;
  if (e instanceof ArrayBuffer)
    s = new Uint8Array(e);
  else {
    const r = e.byteOffset, i = e.byteLength;
    s = new Uint8Array(e.buffer || e.arrayBuffer, r, i);
  }
  return t.set(s, n), n + Ie(s.byteLength, 4);
}
async function xc(e) {
  const t = [];
  for await (const n of e)
    t.push(n);
  return Fc(...t);
}
function mr() {
  let e;
  if (typeof window < "u" && window.performance)
    e = window.performance.now();
  else if (typeof process < "u" && process.hrtime) {
    const t = process.hrtime();
    e = t[0] * 1e3 + t[1] / 1e6;
  } else
    e = Date.now();
  return e;
}
class Ar {
  constructor(t, n) {
    this.name = void 0, this.type = void 0, this.sampleSize = 1, this.time = 0, this.count = 0, this.samples = 0, this.lastTiming = 0, this.lastSampleTime = 0, this.lastSampleCount = 0, this._count = 0, this._time = 0, this._samples = 0, this._startTime = 0, this._timerPending = !1, this.name = t, this.type = n, this.reset();
  }
  reset() {
    return this.time = 0, this.count = 0, this.samples = 0, this.lastTiming = 0, this.lastSampleTime = 0, this.lastSampleCount = 0, this._count = 0, this._time = 0, this._samples = 0, this._startTime = 0, this._timerPending = !1, this;
  }
  setSampleSize(t) {
    return this.sampleSize = t, this;
  }
  incrementCount() {
    return this.addCount(1), this;
  }
  decrementCount() {
    return this.subtractCount(1), this;
  }
  addCount(t) {
    return this._count += t, this._samples++, this._checkSampling(), this;
  }
  subtractCount(t) {
    return this._count -= t, this._samples++, this._checkSampling(), this;
  }
  addTime(t) {
    return this._time += t, this.lastTiming = t, this._samples++, this._checkSampling(), this;
  }
  timeStart() {
    return this._startTime = mr(), this._timerPending = !0, this;
  }
  timeEnd() {
    return this._timerPending ? (this.addTime(mr() - this._startTime), this._timerPending = !1, this._checkSampling(), this) : this;
  }
  getSampleAverageCount() {
    return this.sampleSize > 0 ? this.lastSampleCount / this.sampleSize : 0;
  }
  getSampleAverageTime() {
    return this.sampleSize > 0 ? this.lastSampleTime / this.sampleSize : 0;
  }
  getSampleHz() {
    return this.lastSampleTime > 0 ? this.sampleSize / (this.lastSampleTime / 1e3) : 0;
  }
  getAverageCount() {
    return this.samples > 0 ? this.count / this.samples : 0;
  }
  getAverageTime() {
    return this.samples > 0 ? this.time / this.samples : 0;
  }
  getHz() {
    return this.time > 0 ? this.samples / (this.time / 1e3) : 0;
  }
  _checkSampling() {
    this._samples === this.sampleSize && (this.lastSampleTime = this._time, this.lastSampleCount = this._count, this.count += this._count, this.time += this._time, this.samples += this._samples, this._time = 0, this._count = 0, this._samples = 0);
  }
}
class so {
  constructor(t) {
    this.id = void 0, this.stats = {}, this.id = t.id, this.stats = {}, this._initializeStats(t.stats), Object.seal(this);
  }
  get(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "count";
    return this._getOrCreate({
      name: t,
      type: n
    });
  }
  get size() {
    return Object.keys(this.stats).length;
  }
  reset() {
    for (const t of Object.values(this.stats))
      t.reset();
    return this;
  }
  forEach(t) {
    for (const n of Object.values(this.stats))
      t(n);
  }
  getTable() {
    const t = {};
    return this.forEach((n) => {
      t[n.name] = {
        time: n.time || 0,
        count: n.count || 0,
        average: n.getAverageTime() || 0,
        hz: n.getHz() || 0
      };
    }), t;
  }
  _initializeStats() {
    (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : []).forEach((n) => this._getOrCreate(n));
  }
  _getOrCreate(t) {
    const {
      name: n,
      type: s
    } = t;
    let r = this.stats[n];
    return r || (t instanceof Ar ? r = t : r = new Ar(n, s), this.stats[n] = r), r;
  }
}
const Lc = "Queued Requests", Gc = "Active Requests", Uc = "Cancelled Requests", Pc = "Queued Requests Ever", Nc = "Active Requests Ever", Hc = {
  id: "request-scheduler",
  throttleRequests: !0,
  maxRequests: 6
};
class Jc {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.props = void 0, this.stats = void 0, this.activeRequestCount = 0, this.requestQueue = [], this.requestMap = /* @__PURE__ */ new Map(), this.deferredUpdate = null, this.props = {
      ...Hc,
      ...t
    }, this.stats = new so({
      id: this.props.id
    }), this.stats.get(Lc), this.stats.get(Gc), this.stats.get(Uc), this.stats.get(Pc), this.stats.get(Nc);
  }
  scheduleRequest(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : () => 0;
    if (!this.props.throttleRequests)
      return Promise.resolve({
        done: () => {
        }
      });
    if (this.requestMap.has(t))
      return this.requestMap.get(t);
    const s = {
      handle: t,
      priority: 0,
      getPriority: n
    }, r = new Promise((i) => (s.resolve = i, s));
    return this.requestQueue.push(s), this.requestMap.set(t, r), this._issueNewRequests(), r;
  }
  _issueRequest(t) {
    const {
      handle: n,
      resolve: s
    } = t;
    let r = !1;
    const i = () => {
      r || (r = !0, this.requestMap.delete(n), this.activeRequestCount--, this._issueNewRequests());
    };
    return this.activeRequestCount++, s ? s({
      done: i
    }) : Promise.resolve({
      done: i
    });
  }
  _issueNewRequests() {
    this.deferredUpdate || (this.deferredUpdate = setTimeout(() => this._issueNewRequestsAsync(), 0));
  }
  _issueNewRequestsAsync() {
    this.deferredUpdate = null;
    const t = Math.max(this.props.maxRequests - this.activeRequestCount, 0);
    if (t !== 0) {
      this._updateAllRequests();
      for (let n = 0; n < t; ++n) {
        const s = this.requestQueue.shift();
        s && this._issueRequest(s);
      }
    }
  }
  _updateAllRequests() {
    const t = this.requestQueue;
    for (let n = 0; n < t.length; ++n) {
      const s = t[n];
      this._updateRequest(s) || (t.splice(n, 1), this.requestMap.delete(s.handle), n--);
    }
    t.sort((n, s) => n.priority - s.priority);
  }
  _updateRequest(t) {
    return t.priority = t.getPriority(t.handle), t.priority < 0 ? (t.resolve(null), !1) : !0;
  }
}
let Vc = "";
const gr = {};
function kc(e) {
  for (const t in gr)
    if (e.startsWith(t)) {
      const n = gr[t];
      e = e.replace(t, n);
    }
  return !e.startsWith("http://") && !e.startsWith("https://") && (e = `${Vc}${e}`), e;
}
function jc(e) {
  return e && typeof e == "object" && e.isBuffer;
}
function ro(e) {
  if (jc(e))
    return e;
  if (e instanceof ArrayBuffer)
    return e;
  if (ArrayBuffer.isView(e))
    return e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
  if (typeof e == "string") {
    const t = e;
    return new TextEncoder().encode(t).buffer;
  }
  if (e && typeof e == "object" && e._toArrayBuffer)
    return e._toArrayBuffer();
  throw new Error("toArrayBuffer");
}
function Kc() {
  var e;
  if (typeof process < "u" && typeof process.cwd < "u")
    return process.cwd();
  const t = (e = window.location) === null || e === void 0 ? void 0 : e.pathname;
  return (t == null ? void 0 : t.slice(0, t.lastIndexOf("/") + 1)) || "";
}
function io(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(t + 1) : "";
}
function Os(e) {
  const t = e ? e.lastIndexOf("/") : -1;
  return t >= 0 ? e.substr(0, t) : "";
}
function zc() {
  const e = [];
  for (let r = 0; r < arguments.length; r++)
    e[r] = r < 0 || arguments.length <= r ? void 0 : arguments[r];
  let t = "", n = !1, s;
  for (let r = e.length - 1; r >= -1 && !n; r--) {
    let i;
    r >= 0 ? i = e[r] : (s === void 0 && (s = Kc()), i = s), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === pe);
  }
  return t = Wc(t, !n), n ? `/${t}` : t.length > 0 ? t : ".";
}
const pe = 47, Gn = 46;
function Wc(e, t) {
  let n = "", s = -1, r = 0, i, o = !1;
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length)
      i = e.charCodeAt(a);
    else {
      if (i === pe)
        break;
      i = pe;
    }
    if (i === pe) {
      if (!(s === a - 1 || r === 1))
        if (s !== a - 1 && r === 2) {
          if (n.length < 2 || !o || n.charCodeAt(n.length - 1) !== Gn || n.charCodeAt(n.length - 2) !== Gn) {
            if (n.length > 2) {
              const c = n.length - 1;
              let u = c;
              for (; u >= 0 && n.charCodeAt(u) !== pe; --u)
                ;
              if (u !== c) {
                n = u === -1 ? "" : n.slice(0, u), s = a, r = 0, o = !1;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", s = a, r = 0, o = !1;
              continue;
            }
          }
          t && (n.length > 0 ? n += "/.." : n = "..", o = !0);
        } else {
          const c = e.slice(s + 1, a);
          n.length > 0 ? n += `/${c}` : n = c, o = !1;
        }
      s = a, r = 0;
    } else
      i === Gn && r !== -1 ? ++r : r = -1;
  }
  return n;
}
const Xc = (e) => typeof e == "boolean", ye = (e) => typeof e == "function", Se = (e) => e !== null && typeof e == "object", pr = (e) => Se(e) && e.constructor === {}.constructor, Qc = (e) => !!e && typeof e[Symbol.iterator] == "function", qc = (e) => e && typeof e[Symbol.asyncIterator] == "function", Xt = (e) => typeof Response < "u" && e instanceof Response || e && e.arrayBuffer && e.text && e.json, Qt = (e) => typeof Blob < "u" && e instanceof Blob, Yc = (e) => e && typeof e == "object" && e.isBuffer, $c = (e) => typeof ReadableStream < "u" && e instanceof ReadableStream || Se(e) && ye(e.tee) && ye(e.cancel) && ye(e.getReader), Zc = (e) => Se(e) && ye(e.read) && ye(e.pipe) && Xc(e.readable), oo = (e) => $c(e) || Zc(e), tu = /^data:([-\w.]+\/[-\w.+]+)(;|,)/, eu = /^([-\w.]+\/[-\w.+]+)/;
function nu(e) {
  const t = eu.exec(e);
  return t ? t[1] : e;
}
function Br(e) {
  const t = tu.exec(e);
  return t ? t[1] : "";
}
const ao = /\?.*/;
function su(e) {
  const t = e.match(ao);
  return t && t[0];
}
function vs(e) {
  return e.replace(ao, "");
}
function Tn(e) {
  return Xt(e) ? e.url : Qt(e) ? e.name || "" : typeof e == "string" ? e : "";
}
function xs(e) {
  if (Xt(e)) {
    const t = e, n = t.headers.get("content-type") || "", s = vs(t.url);
    return nu(n) || Br(s);
  }
  return Qt(e) ? e.type || "" : typeof e == "string" ? Br(e) : "";
}
function ru(e) {
  return Xt(e) ? e.headers["content-length"] || -1 : Qt(e) ? e.size : typeof e == "string" ? e.length : e instanceof ArrayBuffer || ArrayBuffer.isView(e) ? e.byteLength : -1;
}
async function co(e) {
  if (Xt(e))
    return e;
  const t = {}, n = ru(e);
  n >= 0 && (t["content-length"] = String(n));
  const s = Tn(e), r = xs(e);
  r && (t["content-type"] = r);
  const i = await au(e);
  i && (t["x-first-bytes"] = i), typeof e == "string" && (e = new TextEncoder().encode(e));
  const o = new Response(e, {
    headers: t
  });
  return Object.defineProperty(o, "url", {
    value: s
  }), o;
}
async function iu(e) {
  if (!e.ok) {
    const t = await ou(e);
    throw new Error(t);
  }
}
async function ou(e) {
  let t = `Failed to fetch resource ${e.url} (${e.status}): `;
  try {
    const n = e.headers.get("Content-Type");
    let s = e.statusText;
    n != null && n.includes("application/json") && (s += ` ${await e.text()}`), t += s, t = t.length > 60 ? `${t.slice(0, 60)}...` : t;
  } catch {
  }
  return t;
}
async function au(e) {
  if (typeof e == "string")
    return `data:,${e.slice(0, 5)}`;
  if (e instanceof Blob) {
    const n = e.slice(0, 5);
    return await new Promise((s) => {
      const r = new FileReader();
      r.onload = (i) => {
        var o;
        return s(i == null || (o = i.target) === null || o === void 0 ? void 0 : o.result);
      }, r.readAsDataURL(n);
    });
  }
  if (e instanceof ArrayBuffer) {
    const n = e.slice(0, 5);
    return `data:base64,${cu(n)}`;
  }
  return null;
}
function cu(e) {
  let t = "";
  const n = new Uint8Array(e);
  for (let s = 0; s < n.byteLength; s++)
    t += String.fromCharCode(n[s]);
  return btoa(t);
}
function uu(e) {
  return !lu(e) && !hu(e);
}
function lu(e) {
  return e.startsWith("http:") || e.startsWith("https:");
}
function hu(e) {
  return e.startsWith("data:");
}
async function _e(e, t) {
  if (typeof e == "string") {
    const r = kc(e);
    if (uu(r)) {
      var n;
      if ((n = globalThis.loaders) !== null && n !== void 0 && n.fetchNode) {
        var s;
        return (s = globalThis.loaders) === null || s === void 0 ? void 0 : s.fetchNode(r, t);
      }
    }
    return await fetch(r, t);
  }
  return await co(e);
}
function fu(e) {
  if (typeof window < "u" && typeof window.process == "object" && window.process.type === "renderer" || typeof process < "u" && typeof process.versions == "object" && process.versions.electron)
    return !0;
  const t = typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent, n = e || t;
  return !!(n && n.indexOf("Electron") >= 0);
}
function De() {
  return !(typeof process == "object" && String(process) === "[object process]" && !process.browser) || fu();
}
const Ue = globalThis.window || globalThis.self || globalThis.global, le = globalThis.process || {}, uo = typeof __VERSION__ < "u" ? __VERSION__ : "untranspiled source";
De();
function du(e) {
  try {
    const t = window[e], n = "__storage_test__";
    return t.setItem(n, n), t.removeItem(n), t;
  } catch {
    return null;
  }
}
class mu {
  constructor(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "sessionStorage";
    this.storage = void 0, this.id = void 0, this.config = void 0, this.storage = du(s), this.id = t, this.config = n, this._loadConfiguration();
  }
  getConfiguration() {
    return this.config;
  }
  setConfiguration(t) {
    if (Object.assign(this.config, t), this.storage) {
      const n = JSON.stringify(this.config);
      this.storage.setItem(this.id, n);
    }
  }
  _loadConfiguration() {
    let t = {};
    if (this.storage) {
      const n = this.storage.getItem(this.id);
      t = n ? JSON.parse(n) : {};
    }
    return Object.assign(this.config, t), this;
  }
}
function Au(e) {
  let t;
  return e < 10 ? t = "".concat(e.toFixed(2), "ms") : e < 100 ? t = "".concat(e.toFixed(1), "ms") : e < 1e3 ? t = "".concat(e.toFixed(0), "ms") : t = "".concat((e / 1e3).toFixed(2), "s"), t;
}
function gu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8;
  const n = Math.max(t - e.length, 0);
  return "".concat(" ".repeat(n)).concat(e);
}
function Un(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 600;
  const r = e.src.replace(/\(/g, "%28").replace(/\)/g, "%29");
  e.width > s && (n = Math.min(n, s / e.width));
  const i = e.width * n, o = e.height * n, a = ["font-size:1px;", "padding:".concat(Math.floor(o / 2), "px ").concat(Math.floor(i / 2), "px;"), "line-height:".concat(o, "px;"), "background:url(".concat(r, ");"), "background-size:".concat(i, "px ").concat(o, "px;"), "color:transparent;"].join("");
  return ["".concat(t, " %c+"), a];
}
let cn;
(function(e) {
  e[e.BLACK = 30] = "BLACK", e[e.RED = 31] = "RED", e[e.GREEN = 32] = "GREEN", e[e.YELLOW = 33] = "YELLOW", e[e.BLUE = 34] = "BLUE", e[e.MAGENTA = 35] = "MAGENTA", e[e.CYAN = 36] = "CYAN", e[e.WHITE = 37] = "WHITE", e[e.BRIGHT_BLACK = 90] = "BRIGHT_BLACK", e[e.BRIGHT_RED = 91] = "BRIGHT_RED", e[e.BRIGHT_GREEN = 92] = "BRIGHT_GREEN", e[e.BRIGHT_YELLOW = 93] = "BRIGHT_YELLOW", e[e.BRIGHT_BLUE = 94] = "BRIGHT_BLUE", e[e.BRIGHT_MAGENTA = 95] = "BRIGHT_MAGENTA", e[e.BRIGHT_CYAN = 96] = "BRIGHT_CYAN", e[e.BRIGHT_WHITE = 97] = "BRIGHT_WHITE";
})(cn || (cn = {}));
const pu = 10;
function yr(e) {
  return typeof e != "string" ? e : (e = e.toUpperCase(), cn[e] || cn.WHITE);
}
function Bu(e, t, n) {
  if (!De && typeof e == "string") {
    if (t) {
      const s = yr(t);
      e = "\x1B[".concat(s, "m").concat(e, "\x1B[39m");
    }
    if (n) {
      const s = yr(n);
      e = "\x1B[".concat(s + pu, "m").concat(e, "\x1B[49m");
    }
  }
  return e;
}
function yu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ["constructor"];
  const n = Object.getPrototypeOf(e), s = Object.getOwnPropertyNames(n), r = e;
  for (const i of s) {
    const o = r[i];
    typeof o == "function" && (t.find((a) => i === a) || (r[i] = o.bind(e)));
  }
}
function un(e, t) {
  if (!e)
    throw new Error(t || "Assertion failed");
}
function Zt() {
  let e;
  if (De() && Ue.performance) {
    var t, n;
    e = Ue == null || (t = Ue.performance) === null || t === void 0 || (n = t.now) === null || n === void 0 ? void 0 : n.call(t);
  } else if ("hrtime" in le) {
    var s;
    const r = le == null || (s = le.hrtime) === null || s === void 0 ? void 0 : s.call(le);
    e = r[0] * 1e3 + r[1] / 1e6;
  } else
    e = Date.now();
  return e;
}
const te = {
  debug: De() && console.debug || console.log,
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error
}, Cu = {
  enabled: !0,
  level: 0
};
function At() {
}
const Cr = {}, Tr = {
  once: !0
};
class En {
  constructor() {
    let {
      id: t
    } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
      id: ""
    };
    this.id = void 0, this.VERSION = uo, this._startTs = Zt(), this._deltaTs = Zt(), this._storage = void 0, this.userData = {}, this.LOG_THROTTLE_TIMEOUT = 0, this.id = t, this.userData = {}, this._storage = new mu("__probe-".concat(this.id, "__"), Cu), this.timeStamp("".concat(this.id, " started")), yu(this), Object.seal(this);
  }
  set level(t) {
    this.setLevel(t);
  }
  get level() {
    return this.getLevel();
  }
  isEnabled() {
    return this._storage.config.enabled;
  }
  getLevel() {
    return this._storage.config.level;
  }
  getTotal() {
    return Number((Zt() - this._startTs).toPrecision(10));
  }
  getDelta() {
    return Number((Zt() - this._deltaTs).toPrecision(10));
  }
  set priority(t) {
    this.level = t;
  }
  get priority() {
    return this.level;
  }
  getPriority() {
    return this.level;
  }
  enable() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
    return this._storage.setConfiguration({
      enabled: t
    }), this;
  }
  setLevel(t) {
    return this._storage.setConfiguration({
      level: t
    }), this;
  }
  get(t) {
    return this._storage.config[t];
  }
  set(t, n) {
    this._storage.setConfiguration({
      [t]: n
    });
  }
  settings() {
    console.table ? console.table(this._storage.config) : console.log(this._storage.config);
  }
  assert(t, n) {
    un(t, n);
  }
  warn(t) {
    return this._getLogFunction(0, t, te.warn, arguments, Tr);
  }
  error(t) {
    return this._getLogFunction(0, t, te.error, arguments);
  }
  deprecated(t, n) {
    return this.warn("`".concat(t, "` is deprecated and will be removed in a later version. Use `").concat(n, "` instead"));
  }
  removed(t, n) {
    return this.error("`".concat(t, "` has been removed. Use `").concat(n, "` instead"));
  }
  probe(t, n) {
    return this._getLogFunction(t, n, te.log, arguments, {
      time: !0,
      once: !0
    });
  }
  log(t, n) {
    return this._getLogFunction(t, n, te.debug, arguments);
  }
  info(t, n) {
    return this._getLogFunction(t, n, console.info, arguments);
  }
  once(t, n) {
    return this._getLogFunction(t, n, te.debug || te.info, arguments, Tr);
  }
  table(t, n, s) {
    return n ? this._getLogFunction(t, n, console.table || At, s && [s], {
      tag: _u(n)
    }) : At;
  }
  image(t) {
    let {
      logLevel: n,
      priority: s,
      image: r,
      message: i = "",
      scale: o = 1
    } = t;
    return this._shouldLog(n || s) ? De() ? bu({
      image: r,
      message: i,
      scale: o
    }) : Eu() : At;
  }
  time(t, n) {
    return this._getLogFunction(t, n, console.time ? console.time : console.info);
  }
  timeEnd(t, n) {
    return this._getLogFunction(t, n, console.timeEnd ? console.timeEnd : console.info);
  }
  timeStamp(t, n) {
    return this._getLogFunction(t, n, console.timeStamp || At);
  }
  group(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      collapsed: !1
    };
    const r = Er({
      logLevel: t,
      message: n,
      opts: s
    }), {
      collapsed: i
    } = s;
    return r.method = (i ? console.groupCollapsed : console.group) || console.info, this._getLogFunction(r);
  }
  groupCollapsed(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.group(t, n, Object.assign({}, s, {
      collapsed: !0
    }));
  }
  groupEnd(t) {
    return this._getLogFunction(t, "", console.groupEnd || At);
  }
  withGroup(t, n, s) {
    this.group(t, n)();
    try {
      s();
    } finally {
      this.groupEnd(t)();
    }
  }
  trace() {
    console.trace && console.trace();
  }
  _shouldLog(t) {
    return this.isEnabled() && this.getLevel() >= lo(t);
  }
  _getLogFunction(t, n, s, r, i) {
    if (this._shouldLog(t)) {
      i = Er({
        logLevel: t,
        message: n,
        args: r,
        opts: i
      }), s = s || i.method, un(s), i.total = this.getTotal(), i.delta = this.getDelta(), this._deltaTs = Zt();
      const o = i.tag || i.message;
      if (i.once && o)
        if (!Cr[o])
          Cr[o] = Zt();
        else
          return At;
      return n = Tu(this.id, i.message, i), s.bind(console, n, ...i.args);
    }
    return At;
  }
}
En.VERSION = uo;
function lo(e) {
  if (!e)
    return 0;
  let t;
  switch (typeof e) {
    case "number":
      t = e;
      break;
    case "object":
      t = e.logLevel || e.priority || 0;
      break;
    default:
      return 0;
  }
  return un(Number.isFinite(t) && t >= 0), t;
}
function Er(e) {
  const {
    logLevel: t,
    message: n
  } = e;
  e.logLevel = lo(t);
  const s = e.args ? Array.from(e.args) : [];
  for (; s.length && s.shift() !== n; )
    ;
  switch (typeof t) {
    case "string":
    case "function":
      n !== void 0 && s.unshift(n), e.message = t;
      break;
    case "object":
      Object.assign(e, t);
      break;
  }
  typeof e.message == "function" && (e.message = e.message());
  const r = typeof e.message;
  return un(r === "string" || r === "object"), Object.assign(e, {
    args: s
  }, e.opts);
}
function Tu(e, t, n) {
  if (typeof t == "string") {
    const s = n.time ? gu(Au(n.total)) : "";
    t = n.time ? "".concat(e, ": ").concat(s, "  ").concat(t) : "".concat(e, ": ").concat(t), t = Bu(t, n.color, n.background);
  }
  return t;
}
function Eu(e) {
  return console.warn("removed"), At;
}
function bu(e) {
  let {
    image: t,
    message: n = "",
    scale: s = 1
  } = e;
  if (typeof t == "string") {
    const i = new Image();
    return i.onload = () => {
      const o = Un(i, n, s);
      console.log(...o);
    }, i.src = t, At;
  }
  const r = t.nodeName || "";
  if (r.toLowerCase() === "img")
    return console.log(...Un(t, n, s)), At;
  if (r.toLowerCase() === "canvas") {
    const i = new Image();
    return i.onload = () => console.log(...Un(i, n, s)), i.src = t.toDataURL(), At;
  }
  return At;
}
function _u(e) {
  for (const t in e)
    for (const n in e[t])
      return n || "untitled";
  return "empty";
}
const ho = new En({
  id: "@probe.gl/log"
}), br = new En({
  id: "loaders.gl"
});
class wu {
  log() {
    return () => {
    };
  }
  info() {
    return () => {
    };
  }
  warn() {
    return () => {
    };
  }
  error() {
    return () => {
    };
  }
}
class Mu {
  constructor() {
    this.console = void 0, this.console = console;
  }
  log() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.log.bind(this.console, ...n);
  }
  info() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.info.bind(this.console, ...n);
  }
  warn() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.warn.bind(this.console, ...n);
  }
  error() {
    for (var t = arguments.length, n = new Array(t), s = 0; s < t; s++)
      n[s] = arguments[s];
    return this.console.error.bind(this.console, ...n);
  }
}
const fo = {
  fetch: null,
  mimeType: void 0,
  nothrow: !1,
  log: new Mu(),
  useLocalLibraries: !1,
  CDN: "https://unpkg.com/@loaders.gl",
  worker: !0,
  maxConcurrency: 3,
  maxMobileConcurrency: 1,
  reuseWorkers: Cn,
  _nodeWorkers: !1,
  _workerType: "",
  limit: 0,
  _limitMB: 0,
  batchSize: "auto",
  batchDebounceMs: 0,
  metadata: !1,
  transforms: []
}, Ru = {
  throws: "nothrow",
  dataType: "(no longer used)",
  uri: "baseUri",
  method: "fetch.method",
  headers: "fetch.headers",
  body: "fetch.body",
  mode: "fetch.mode",
  credentials: "fetch.credentials",
  cache: "fetch.cache",
  redirect: "fetch.redirect",
  referrer: "fetch.referrer",
  referrerPolicy: "fetch.referrerPolicy",
  integrity: "fetch.integrity",
  keepalive: "fetch.keepalive",
  signal: "fetch.signal"
};
function mo() {
  globalThis.loaders = globalThis.loaders || {};
  const {
    loaders: e
  } = globalThis;
  return e._state = e._state || {}, e._state;
}
function Ao() {
  const e = mo();
  return e.globalOptions = e.globalOptions || {
    ...fo
  }, e.globalOptions;
}
function Iu(e, t, n, s) {
  return n = n || [], n = Array.isArray(n) ? n : [n], Su(e, n), Fu(t, e, s);
}
function Su(e, t) {
  _r(e, null, fo, Ru, t);
  for (const n of t) {
    const s = e && e[n.id] || {}, r = n.options && n.options[n.id] || {}, i = n.deprecatedOptions && n.deprecatedOptions[n.id] || {};
    _r(s, n.id, r, i, t);
  }
}
function _r(e, t, n, s, r) {
  const i = t || "Top level", o = t ? `${t}.` : "";
  for (const a in e) {
    const c = !t && Se(e[a]), u = a === "baseUri" && !t, l = a === "workerUrl" && t;
    if (!(a in n) && !u && !l) {
      if (a in s)
        br.warn(`${i} loader option '${o}${a}' no longer supported, use '${s[a]}'`)();
      else if (!c) {
        const h = Du(a, r);
        br.warn(`${i} loader option '${o}${a}' not recognized. ${h}`)();
      }
    }
  }
}
function Du(e, t) {
  const n = e.toLowerCase();
  let s = "";
  for (const r of t)
    for (const i in r.options) {
      if (e === i)
        return `Did you mean '${r.id}.${i}'?`;
      const o = i.toLowerCase();
      (n.startsWith(o) || o.startsWith(n)) && (s = s || `Did you mean '${r.id}.${i}'?`);
    }
  return s;
}
function Fu(e, t, n) {
  const r = {
    ...e.options || {}
  };
  return Ou(r, n), r.log === null && (r.log = new wu()), wr(r, Ao()), wr(r, t), r;
}
function wr(e, t) {
  for (const n in t)
    if (n in t) {
      const s = t[n];
      pr(s) && pr(e[n]) ? e[n] = {
        ...e[n],
        ...t[n]
      } : e[n] = t[n];
    }
}
function Ou(e, t) {
  t && !("baseUri" in e) && (e.baseUri = t);
}
function Ls(e) {
  var t;
  return e ? (Array.isArray(e) && (e = e[0]), Array.isArray((t = e) === null || t === void 0 ? void 0 : t.extensions)) : !1;
}
function go(e) {
  var t, n;
  U(e, "null loader"), U(Ls(e), "invalid loader");
  let s;
  return Array.isArray(e) && (s = e[1], e = e[0], e = {
    ...e,
    options: {
      ...e.options,
      ...s
    }
  }), ((t = e) !== null && t !== void 0 && t.parseTextSync || (n = e) !== null && n !== void 0 && n.parseText) && (e.text = !0), e.text || (e.binary = !0), e;
}
const vu = () => {
  const e = mo();
  return e.loaderRegistry = e.loaderRegistry || [], e.loaderRegistry;
};
function xu() {
  return vu();
}
const Lu = new En({
  id: "loaders.gl"
}), Gu = /\.([^.]+)$/;
async function Uu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!po(e))
    return null;
  let r = Mr(e, t, {
    ...n,
    nothrow: !0
  }, s);
  if (r)
    return r;
  if (Qt(e) && (e = await e.slice(0, 10).arrayBuffer(), r = Mr(e, t, n, s)), !r && !(n != null && n.nothrow))
    throw new Error(Bo(e));
  return r;
}
function Mr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0;
  if (!po(e))
    return null;
  if (t && !Array.isArray(t))
    return go(t);
  let r = [];
  t && (r = r.concat(t)), n != null && n.ignoreRegisteredLoaders || r.push(...xu()), Nu(r);
  const i = Pu(e, r, n, s);
  if (!i && !(n != null && n.nothrow))
    throw new Error(Bo(e));
  return i;
}
function Pu(e, t, n, s) {
  const r = Tn(e), i = xs(e), o = vs(r) || (s == null ? void 0 : s.url);
  let a = null, c = "";
  if (n != null && n.mimeType && (a = Pn(t, n == null ? void 0 : n.mimeType), c = `match forced by supplied MIME type ${n == null ? void 0 : n.mimeType}`), a = a || Hu(t, o), c = c || (a ? `matched url ${o}` : ""), a = a || Pn(t, i), c = c || (a ? `matched MIME type ${i}` : ""), a = a || Vu(t, e), c = c || (a ? `matched initial data ${yo(e)}` : ""), n != null && n.fallbackMimeType && (a = a || Pn(t, n == null ? void 0 : n.fallbackMimeType), c = c || (a ? `matched fallback MIME type ${i}` : "")), c) {
    var u;
    Lu.log(1, `selectLoader selected ${(u = a) === null || u === void 0 ? void 0 : u.name}: ${c}.`);
  }
  return a;
}
function po(e) {
  return !(e instanceof Response && e.status === 204);
}
function Bo(e) {
  const t = Tn(e), n = xs(e);
  let s = "No valid loader found (";
  s += t ? `${io(t)}, ` : "no url provided, ", s += `MIME type: ${n ? `"${n}"` : "not provided"}, `;
  const r = e ? yo(e) : "";
  return s += r ? ` first bytes: "${r}"` : "first bytes: not available", s += ")", s;
}
function Nu(e) {
  for (const t of e)
    go(t);
}
function Hu(e, t) {
  const n = t && Gu.exec(t), s = n && n[1];
  return s ? Ju(e, s) : null;
}
function Ju(e, t) {
  t = t.toLowerCase();
  for (const n of e)
    for (const s of n.extensions)
      if (s.toLowerCase() === t)
        return n;
  return null;
}
function Pn(e, t) {
  for (const n of e)
    if (n.mimeTypes && n.mimeTypes.includes(t) || t === `application/x.${n.id}`)
      return n;
  return null;
}
function Vu(e, t) {
  if (!t)
    return null;
  for (const n of e)
    if (typeof t == "string") {
      if (ku(t, n))
        return n;
    } else if (ArrayBuffer.isView(t)) {
      if (Rr(t.buffer, t.byteOffset, n))
        return n;
    } else if (t instanceof ArrayBuffer && Rr(t, 0, n))
      return n;
  return null;
}
function ku(e, t) {
  return t.testText ? t.testText(e) : (Array.isArray(t.tests) ? t.tests : [t.tests]).some((s) => e.startsWith(s));
}
function Rr(e, t, n) {
  return (Array.isArray(n.tests) ? n.tests : [n.tests]).some((r) => ju(e, t, n, r));
}
function ju(e, t, n, s) {
  if (s instanceof ArrayBuffer)
    return Dc(s, e, s.byteLength);
  switch (typeof s) {
    case "function":
      return s(e);
    case "string":
      const r = fs(e, t, s.length);
      return s === r;
    default:
      return !1;
  }
}
function yo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 5;
  return typeof e == "string" ? e.slice(0, t) : ArrayBuffer.isView(e) ? fs(e.buffer, e.byteOffset, t) : e instanceof ArrayBuffer ? fs(e, 0, t) : "";
}
function fs(e, t, n) {
  if (e.byteLength < t + n)
    return "";
  const s = new DataView(e);
  let r = "";
  for (let i = 0; i < n; i++)
    r += String.fromCharCode(s.getUint8(t + i));
  return r;
}
const Ku = 256 * 1024;
function* zu(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || Ku;
  let s = 0;
  const r = new TextEncoder();
  for (; s < e.length; ) {
    const i = Math.min(e.length - s, n), o = e.slice(s, s + i);
    s += i, yield r.encode(o);
  }
}
const Wu = 256 * 1024;
function Xu(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function* () {
    const {
      chunkSize: n = Wu
    } = t;
    let s = 0;
    for (; s < e.byteLength; ) {
      const r = Math.min(e.byteLength - s, n), i = new ArrayBuffer(r), o = new Uint8Array(e, s, r);
      new Uint8Array(i).set(o), s += r, yield i;
    }
  }();
}
const Qu = 1024 * 1024;
async function* qu(e, t) {
  const n = (t == null ? void 0 : t.chunkSize) || Qu;
  let s = 0;
  for (; s < e.size; ) {
    const r = s + n, i = await e.slice(s, r).arrayBuffer();
    s = r, yield i;
  }
}
function Ir(e, t) {
  return Cn ? Yu(e, t) : $u(e);
}
async function* Yu(e, t) {
  const n = e.getReader();
  let s;
  try {
    for (; ; ) {
      const r = s || n.read();
      t != null && t._streamReadAhead && (s = n.read());
      const {
        done: i,
        value: o
      } = await r;
      if (i)
        return;
      yield ro(o);
    }
  } catch {
    n.releaseLock();
  }
}
async function* $u(e, t) {
  for await (const n of e)
    yield ro(n);
}
function Zu(e, t) {
  if (typeof e == "string")
    return zu(e, t);
  if (e instanceof ArrayBuffer)
    return Xu(e, t);
  if (Qt(e))
    return qu(e, t);
  if (oo(e))
    return Ir(e, t);
  if (Xt(e))
    return Ir(e.body, t);
  throw new Error("makeIterator");
}
const Co = "Cannot convert supplied data type";
function tl(e, t, n) {
  if (t.text && typeof e == "string")
    return e;
  if (Yc(e) && (e = e.buffer), e instanceof ArrayBuffer) {
    const s = e;
    return t.text && !t.binary ? new TextDecoder("utf8").decode(s) : s;
  }
  if (ArrayBuffer.isView(e)) {
    if (t.text && !t.binary)
      return new TextDecoder("utf8").decode(e);
    let s = e.buffer;
    const r = e.byteLength || e.length;
    return (e.byteOffset !== 0 || r !== s.byteLength) && (s = s.slice(e.byteOffset, e.byteOffset + r)), s;
  }
  throw new Error(Co);
}
async function el(e, t, n) {
  const s = e instanceof ArrayBuffer || ArrayBuffer.isView(e);
  if (typeof e == "string" || s)
    return tl(e, t);
  if (Qt(e) && (e = await co(e)), Xt(e)) {
    const r = e;
    return await iu(r), t.binary ? await r.arrayBuffer() : await r.text();
  }
  if (oo(e) && (e = Zu(e, n)), Qc(e) || qc(e))
    return xc(e);
  throw new Error(Co);
}
function To(e, t) {
  const n = Ao(), s = e || n;
  return typeof s.fetch == "function" ? s.fetch : Se(s.fetch) ? (r) => _e(r, s.fetch) : t != null && t.fetch ? t == null ? void 0 : t.fetch : _e;
}
function nl(e, t, n) {
  if (n)
    return n;
  const s = {
    fetch: To(t, e),
    ...e
  };
  if (s.url) {
    const r = vs(s.url);
    s.baseUrl = r, s.queryString = su(s.url), s.filename = io(r), s.baseUrl = Os(r);
  }
  return Array.isArray(s.loaders) || (s.loaders = null), s;
}
function sl(e, t) {
  if (e && !Array.isArray(e))
    return e;
  let n;
  if (e && (n = Array.isArray(e) ? e : [e]), t && t.loaders) {
    const s = Array.isArray(t.loaders) ? t.loaders : [t.loaders];
    n = n ? [...n, ...s] : s;
  }
  return n && n.length ? n : void 0;
}
async function ln(e, t, n, s) {
  t && !Array.isArray(t) && !Ls(t) && (s = void 0, n = t, t = void 0), e = await e, n = n || {};
  const r = Tn(e), o = sl(t, s), a = await Uu(e, o, n);
  return a ? (n = Iu(n, a, o, r), s = nl({
    url: r,
    _parse: ln,
    loaders: o
  }, n, s || null), await rl(a, e, n, s)) : null;
}
async function rl(e, t, n, s) {
  if (pc(e), n = oc(e.options, n), Xt(t)) {
    const i = t, {
      ok: o,
      redirected: a,
      status: c,
      statusText: u,
      type: l,
      url: h
    } = i, f = Object.fromEntries(i.headers.entries());
    s.response = {
      headers: f,
      ok: o,
      redirected: a,
      status: c,
      statusText: u,
      type: l,
      url: h
    };
  }
  t = await el(t, e, n);
  const r = e;
  if (r.parseTextSync && typeof t == "string")
    return r.parseTextSync(t, n, s);
  if (wc(e, n))
    return await Mc(e, t, n, s, ln);
  if (r.parseText && typeof t == "string")
    return await r.parseText(t, n, s);
  if (r.parse)
    return await r.parse(t, n, s);
  throw Lt(!r.parseSync), new Error(`${e.id} loader - no parser found and worker is disabled`);
}
function il(e) {
  switch (e.constructor) {
    case Int8Array:
      return "int8";
    case Uint8Array:
    case Uint8ClampedArray:
      return "uint8";
    case Int16Array:
      return "int16";
    case Uint16Array:
      return "uint16";
    case Int32Array:
      return "int32";
    case Uint32Array:
      return "uint32";
    case Float32Array:
      return "float32";
    case Float64Array:
      return "float64";
    default:
      return "null";
  }
}
function ol(e) {
  let t = 1 / 0, n = 1 / 0, s = 1 / 0, r = -1 / 0, i = -1 / 0, o = -1 / 0;
  const a = e.POSITION ? e.POSITION.value : [], c = a && a.length;
  for (let u = 0; u < c; u += 3) {
    const l = a[u], h = a[u + 1], f = a[u + 2];
    t = l < t ? l : t, n = h < n ? h : n, s = f < s ? f : s, r = l > r ? l : r, i = h > i ? h : i, o = f > o ? f : o;
  }
  return [[t, n, s], [r, i, o]];
}
function al(e, t, n) {
  const s = il(t.value), r = n || cl(t);
  return {
    name: e,
    type: {
      type: "fixed-size-list",
      listSize: t.size,
      children: [{
        name: "value",
        type: s
      }]
    },
    nullable: !1,
    metadata: r
  };
}
function cl(e) {
  const t = {};
  return "byteOffset" in e && (t.byteOffset = e.byteOffset.toString(10)), "byteStride" in e && (t.byteStride = e.byteStride.toString(10)), "normalized" in e && (t.normalized = e.normalized.toString()), t;
}
async function Fe(e, t, n, s) {
  let r, i;
  !Array.isArray(t) && !Ls(t) ? (r = [], i = t) : (r = t, i = n);
  const o = To(i);
  let a = e;
  return typeof e == "string" && (a = await o(e)), Qt(e) && (a = await o(e)), Array.isArray(r) ? await ln(a, r, i) : await ln(a, r, i);
}
const ul = 1 / Math.PI * 180, ll = 1 / 180 * Math.PI, hl = {
  EPSILON: 1e-12,
  debug: !1,
  precision: 4,
  printTypes: !1,
  printDegrees: !1,
  printRowMajor: !0,
  _cartographicRadians: !1
};
globalThis.mathgl = globalThis.mathgl || {
  config: {
    ...hl
  }
};
const q = globalThis.mathgl.config;
function fl(e, {
  precision: t = q.precision
} = {}) {
  return e = gl(e), "".concat(parseFloat(e.toPrecision(t)));
}
function Wt(e) {
  return Array.isArray(e) || ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function ds(e) {
  return ml(e);
}
function dl(e) {
  return Et(e);
}
function ml(e, t) {
  return Gs(e, (n) => n * ll, t);
}
function Et(e, t) {
  return Gs(e, (n) => n * ul, t);
}
function Al(e, t, n) {
  return Gs(e, (s) => Math.max(t, Math.min(n, s)));
}
function Ht(e, t, n) {
  const s = q.EPSILON;
  n && (q.EPSILON = n);
  try {
    if (e === t)
      return !0;
    if (Wt(e) && Wt(t)) {
      if (e.length !== t.length)
        return !1;
      for (let r = 0; r < e.length; ++r)
        if (!Ht(e[r], t[r]))
          return !1;
      return !0;
    }
    return e && e.equals ? e.equals(t) : t && t.equals ? t.equals(e) : typeof e == "number" && typeof t == "number" ? Math.abs(e - t) <= q.EPSILON * Math.max(1, Math.abs(e), Math.abs(t)) : !1;
  } finally {
    q.EPSILON = s;
  }
}
function gl(e) {
  return Math.round(e / q.EPSILON) * q.EPSILON;
}
function pl(e) {
  return e.clone ? e.clone() : new Array(e.length);
}
function Gs(e, t, n) {
  if (Wt(e)) {
    const s = e;
    n = n || pl(s);
    for (let r = 0; r < n.length && r < s.length; ++r) {
      const i = typeof e == "number" ? e : e[r];
      n[r] = t(i, r, n);
    }
    return n;
  }
  return t(e);
}
function Bl(e) {
  function t() {
    var n = Reflect.construct(e, Array.from(arguments));
    return Object.setPrototypeOf(n, Object.getPrototypeOf(this)), n;
  }
  return t.prototype = Object.create(e.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e, t;
}
class Us extends Bl(Array) {
  clone() {
    return new this.constructor().copy(this);
  }
  fromArray(t, n = 0) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      this[s] = t[s + n];
    return this.check();
  }
  toArray(t = [], n = 0) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      t[n + s] = this[s];
    return t;
  }
  toObject(t) {
    return t;
  }
  from(t) {
    return Array.isArray(t) ? this.copy(t) : this.fromObject(t);
  }
  to(t) {
    return t === this ? this : Wt(t) ? this.toArray(t) : this.toObject(t);
  }
  toTarget(t) {
    return t ? this.to(t) : this;
  }
  toFloat32Array() {
    return new Float32Array(this);
  }
  toString() {
    return this.formatString(q);
  }
  formatString(t) {
    let n = "";
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += (s > 0 ? ", " : "") + fl(this[s], t);
    return "".concat(t.printTypes ? this.constructor.name : "", "[").concat(n, "]");
  }
  equals(t) {
    if (!t || this.length !== t.length)
      return !1;
    for (let n = 0; n < this.ELEMENTS; ++n)
      if (!Ht(this[n], t[n]))
        return !1;
    return !0;
  }
  exactEquals(t) {
    if (!t || this.length !== t.length)
      return !1;
    for (let n = 0; n < this.ELEMENTS; ++n)
      if (this[n] !== t[n])
        return !1;
    return !0;
  }
  negate() {
    for (let t = 0; t < this.ELEMENTS; ++t)
      this[t] = -this[t];
    return this.check();
  }
  lerp(t, n, s) {
    if (s === void 0)
      return this.lerp(this, t, n);
    for (let r = 0; r < this.ELEMENTS; ++r) {
      const i = t[r], o = typeof n == "number" ? n : n[r];
      this[r] = i + s * (o - i);
    }
    return this.check();
  }
  min(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] = Math.min(t[n], this[n]);
    return this.check();
  }
  max(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] = Math.max(t[n], this[n]);
    return this.check();
  }
  clamp(t, n) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      this[s] = Math.min(Math.max(this[s], t[s]), n[s]);
    return this.check();
  }
  add(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] += n[s];
    return this.check();
  }
  subtract(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] -= n[s];
    return this.check();
  }
  scale(t) {
    if (typeof t == "number")
      for (let n = 0; n < this.ELEMENTS; ++n)
        this[n] *= t;
    else
      for (let n = 0; n < this.ELEMENTS && n < t.length; ++n)
        this[n] *= t[n];
    return this.check();
  }
  multiplyByScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] *= t;
    return this.check();
  }
  check() {
    if (q.debug && !this.validate())
      throw new Error("math.gl: ".concat(this.constructor.name, " some fields set to invalid numbers'"));
    return this;
  }
  validate() {
    let t = this.length === this.ELEMENTS;
    for (let n = 0; n < this.ELEMENTS; ++n)
      t = t && Number.isFinite(this[n]);
    return t;
  }
  sub(t) {
    return this.subtract(t);
  }
  setScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] = t;
    return this.check();
  }
  addScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] += t;
    return this.check();
  }
  subScalar(t) {
    return this.addScalar(-t);
  }
  multiplyScalar(t) {
    for (let n = 0; n < this.ELEMENTS; ++n)
      this[n] *= t;
    return this.check();
  }
  divideScalar(t) {
    return this.multiplyByScalar(1 / t);
  }
  clampScalar(t, n) {
    for (let s = 0; s < this.ELEMENTS; ++s)
      this[s] = Math.min(Math.max(this[s], t), n);
    return this.check();
  }
  get elements() {
    return this;
  }
}
function yl(e, t) {
  if (e.length !== t)
    return !1;
  for (let n = 0; n < e.length; ++n)
    if (!Number.isFinite(e[n]))
      return !1;
  return !0;
}
function G(e) {
  if (!Number.isFinite(e))
    throw new Error("Invalid number ".concat(JSON.stringify(e)));
  return e;
}
function Ce(e, t, n = "") {
  if (q.debug && !yl(e, t))
    throw new Error("math.gl: ".concat(n, " some fields set to invalid numbers'"));
  return e;
}
function J(e, t) {
  if (!e)
    throw new Error("math.gl assertion ".concat(t));
}
class Ps extends Us {
  get x() {
    return this[0];
  }
  set x(t) {
    this[0] = G(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = G(t);
  }
  len() {
    return Math.sqrt(this.lengthSquared());
  }
  magnitude() {
    return this.len();
  }
  lengthSquared() {
    let t = 0;
    for (let n = 0; n < this.ELEMENTS; ++n)
      t += this[n] * this[n];
    return t;
  }
  magnitudeSquared() {
    return this.lengthSquared();
  }
  distance(t) {
    return Math.sqrt(this.distanceSquared(t));
  }
  distanceSquared(t) {
    let n = 0;
    for (let s = 0; s < this.ELEMENTS; ++s) {
      const r = this[s] - t[s];
      n += r * r;
    }
    return G(n);
  }
  dot(t) {
    let n = 0;
    for (let s = 0; s < this.ELEMENTS; ++s)
      n += this[s] * t[s];
    return G(n);
  }
  normalize() {
    const t = this.magnitude();
    if (t !== 0)
      for (let n = 0; n < this.ELEMENTS; ++n)
        this[n] /= t;
    return this.check();
  }
  multiply(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] *= n[s];
    return this.check();
  }
  divide(...t) {
    for (const n of t)
      for (let s = 0; s < this.ELEMENTS; ++s)
        this[s] /= n[s];
    return this.check();
  }
  lengthSq() {
    return this.lengthSquared();
  }
  distanceTo(t) {
    return this.distance(t);
  }
  distanceToSquared(t) {
    return this.distanceSquared(t);
  }
  getComponent(t) {
    return J(t >= 0 && t < this.ELEMENTS, "index is out of range"), G(this[t]);
  }
  setComponent(t, n) {
    return J(t >= 0 && t < this.ELEMENTS, "index is out of range"), this[t] = n, this.check();
  }
  addVectors(t, n) {
    return this.copy(t).add(n);
  }
  subVectors(t, n) {
    return this.copy(t).subtract(n);
  }
  multiplyVectors(t, n) {
    return this.copy(t).multiply(n);
  }
  addScaledVector(t, n) {
    return this.add(new this.constructor(t).multiplyScalar(n));
  }
}
const Te = 1e-6;
let _t = typeof Float32Array < "u" ? Float32Array : Array;
function Cl() {
  const e = new _t(2);
  return _t != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function Tl(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e;
}
function El(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r + n[4], e[1] = n[1] * s + n[3] * r + n[5], e;
}
function Eo(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[3] * r + n[6], e[1] = n[1] * s + n[4] * r + n[7], e;
}
function bo(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[4] * r + n[12], e[1] = n[1] * s + n[5] * r + n[13], e;
}
(function() {
  const e = Cl();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 2), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], i(e, e, o), t[a] = e[0], t[a + 1] = e[1];
    return t;
  };
})();
function _o(e, t, n) {
  const s = t[0], r = t[1], i = n[3] * s + n[7] * r || 1;
  return e[0] = (n[0] * s + n[4] * r) / i, e[1] = (n[1] * s + n[5] * r) / i, e;
}
function wo(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[3] * s + n[7] * r + n[11] * i || 1;
  return e[0] = (n[0] * s + n[4] * r + n[8] * i) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i) / o, e;
}
function bl(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e;
}
function _l(e, t, n) {
  const s = t[0], r = t[1];
  return e[0] = n[0] * s + n[2] * r, e[1] = n[1] * s + n[3] * r, e[2] = t[2], e[3] = t[3], e;
}
function Mo(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = n[0] * s + n[3] * r + n[6] * i, e[1] = n[1] * s + n[4] * r + n[7] * i, e[2] = n[2] * s + n[5] * r + n[8] * i, e[3] = t[3], e;
}
class bn extends Ps {
  constructor(t = 0, n = 0) {
    super(2), Wt(t) && arguments.length === 1 ? this.copy(t) : (q.debug && (G(t), G(n)), this[0] = t, this[1] = n);
  }
  set(t, n) {
    return this[0] = t, this[1] = n, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this.check();
  }
  fromObject(t) {
    return q.debug && (G(t.x), G(t.y)), this[0] = t.x, this[1] = t.y, this.check();
  }
  toObject(t) {
    return t.x = this[0], t.y = this[1], t;
  }
  get ELEMENTS() {
    return 2;
  }
  horizontalAngle() {
    return Math.atan2(this.y, this.x);
  }
  verticalAngle() {
    return Math.atan2(this.x, this.y);
  }
  transform(t) {
    return this.transformAsPoint(t);
  }
  transformAsPoint(t) {
    return bo(this, this, t), this.check();
  }
  transformAsVector(t) {
    return _o(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return Eo(this, this, t), this.check();
  }
  transformByMatrix2x3(t) {
    return El(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return Tl(this, this, t), this.check();
  }
}
function Ro() {
  const e = new _t(3);
  return _t != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function Io(e) {
  const t = e[0], n = e[1], s = e[2];
  return Math.sqrt(t * t + n * n + s * s);
}
function Sr(e, t, n) {
  const s = new _t(3);
  return s[0] = e, s[1] = t, s[2] = n, s;
}
function wl(e, t) {
  const n = t[0], s = t[1], r = t[2];
  let i = n * n + s * s + r * r;
  return i > 0 && (i = 1 / Math.sqrt(i)), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e;
}
function Ns(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function nn(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], a = n[1], c = n[2];
  return e[0] = r * c - i * a, e[1] = i * o - s * c, e[2] = s * a - r * o, e;
}
function Hs(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  let o = n[3] * s + n[7] * r + n[11] * i + n[15];
  return o = o || 1, e[0] = (n[0] * s + n[4] * r + n[8] * i + n[12]) / o, e[1] = (n[1] * s + n[5] * r + n[9] * i + n[13]) / o, e[2] = (n[2] * s + n[6] * r + n[10] * i + n[14]) / o, e;
}
function So(e, t, n) {
  const s = t[0], r = t[1], i = t[2];
  return e[0] = s * n[0] + r * n[3] + i * n[6], e[1] = s * n[1] + r * n[4] + i * n[7], e[2] = s * n[2] + r * n[5] + i * n[8], e;
}
function Do(e, t, n) {
  const s = n[0], r = n[1], i = n[2], o = n[3], a = t[0], c = t[1], u = t[2];
  let l = r * u - i * c, h = i * a - s * u, f = s * c - r * a, d = r * f - i * h, A = i * l - s * f, g = s * h - r * l;
  const p = o * 2;
  return l *= p, h *= p, f *= p, d *= 2, A *= 2, g *= 2, e[0] = a + l + d, e[1] = c + h + A, e[2] = u + f + g, e;
}
function Ml(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0], i[1] = r[1] * Math.cos(s) - r[2] * Math.sin(s), i[2] = r[1] * Math.sin(s) + r[2] * Math.cos(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function Rl(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[2] * Math.sin(s) + r[0] * Math.cos(s), i[1] = r[1], i[2] = r[2] * Math.cos(s) - r[0] * Math.sin(s), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function Il(e, t, n, s) {
  const r = [], i = [];
  return r[0] = t[0] - n[0], r[1] = t[1] - n[1], r[2] = t[2] - n[2], i[0] = r[0] * Math.cos(s) - r[1] * Math.sin(s), i[1] = r[0] * Math.sin(s) + r[1] * Math.cos(s), i[2] = r[2], e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e;
}
function Sl(e, t) {
  const n = e[0], s = e[1], r = e[2], i = t[0], o = t[1], a = t[2], c = Math.sqrt((n * n + s * s + r * r) * (i * i + o * o + a * a)), u = c && Ns(e, t) / c;
  return Math.acos(Math.min(Math.max(u, -1), 1));
}
const Dl = Io;
(function() {
  const e = Ro();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 3), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], i(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2];
    return t;
  };
})();
const Nn = [0, 0, 0];
let Pe;
class m extends Ps {
  static get ZERO() {
    return Pe || (Pe = new m(0, 0, 0), Object.freeze(Pe)), Pe;
  }
  constructor(t = 0, n = 0, s = 0) {
    super(-0, -0, -0), arguments.length === 1 && Wt(t) ? this.copy(t) : (q.debug && (G(t), G(n), G(s)), this[0] = t, this[1] = n, this[2] = s);
  }
  set(t, n, s) {
    return this[0] = t, this[1] = n, this[2] = s, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this.check();
  }
  fromObject(t) {
    return q.debug && (G(t.x), G(t.y), G(t.z)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this.check();
  }
  toObject(t) {
    return t.x = this[0], t.y = this[1], t.z = this[2], t;
  }
  get ELEMENTS() {
    return 3;
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = G(t);
  }
  angle(t) {
    return Sl(this, t);
  }
  cross(t) {
    return nn(this, this, t), this.check();
  }
  rotateX({
    radians: t,
    origin: n = Nn
  }) {
    return Ml(this, this, n, t), this.check();
  }
  rotateY({
    radians: t,
    origin: n = Nn
  }) {
    return Rl(this, this, n, t), this.check();
  }
  rotateZ({
    radians: t,
    origin: n = Nn
  }) {
    return Il(this, this, n, t), this.check();
  }
  transform(t) {
    return this.transformAsPoint(t);
  }
  transformAsPoint(t) {
    return Hs(this, this, t), this.check();
  }
  transformAsVector(t) {
    return wo(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return So(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return bl(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return Do(this, this, t), this.check();
  }
}
let Ne;
class Js extends Ps {
  static get ZERO() {
    return Ne || (Ne = new Js(0, 0, 0, 0), Object.freeze(Ne)), Ne;
  }
  constructor(t = 0, n = 0, s = 0, r = 0) {
    super(-0, -0, -0, -0), Wt(t) && arguments.length === 1 ? this.copy(t) : (q.debug && (G(t), G(n), G(s), G(r)), this[0] = t, this[1] = n, this[2] = s, this[3] = r);
  }
  set(t, n, s, r) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this.check();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this.check();
  }
  fromObject(t) {
    return q.debug && (G(t.x), G(t.y), G(t.z), G(t.w)), this[0] = t.x, this[1] = t.y, this[2] = t.z, this[3] = t.w, this;
  }
  toObject(t) {
    return t.x = this[0], t.y = this[1], t.z = this[2], t.w = this[3], t;
  }
  get ELEMENTS() {
    return 4;
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = G(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = G(t);
  }
  transform(t) {
    return Hs(this, this, t), this.check();
  }
  transformByMatrix3(t) {
    return Mo(this, this, t), this.check();
  }
  transformByMatrix2(t) {
    return _l(this, this, t), this.check();
  }
  transformByQuaternion(t) {
    return Do(this, this, t), this.check();
  }
  applyMatrix4(t) {
    return t.transform(this, this), this;
  }
}
class Fo extends Us {
  toString() {
    let t = "[";
    if (q.printRowMajor) {
      t += "row-major:";
      for (let n = 0; n < this.RANK; ++n)
        for (let s = 0; s < this.RANK; ++s)
          t += " ".concat(this[s * this.RANK + n]);
    } else {
      t += "column-major:";
      for (let n = 0; n < this.ELEMENTS; ++n)
        t += " ".concat(this[n]);
    }
    return t += "]", t;
  }
  getElementIndex(t, n) {
    return n * this.RANK + t;
  }
  getElement(t, n) {
    return this[n * this.RANK + t];
  }
  setElement(t, n, s) {
    return this[n * this.RANK + t] = G(s), this;
  }
  getColumn(t, n = new Array(this.RANK).fill(-0)) {
    const s = t * this.RANK;
    for (let r = 0; r < this.RANK; ++r)
      n[r] = this[s + r];
    return n;
  }
  setColumn(t, n) {
    const s = t * this.RANK;
    for (let r = 0; r < this.RANK; ++r)
      this[s + r] = n[r];
    return this;
  }
}
function Fl() {
  const e = new _t(9);
  return _t != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function Ol(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = n, e[5] = t[7], e[6] = s, e[7] = r;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function vl(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], a = t[5], c = t[6], u = t[7], l = t[8], h = l * o - a * u, f = -l * i + a * c, d = u * i - o * c;
  let A = n * h + s * f + r * d;
  return A ? (A = 1 / A, e[0] = h * A, e[1] = (-l * s + r * u) * A, e[2] = (a * s - r * o) * A, e[3] = f * A, e[4] = (l * n - r * c) * A, e[5] = (-a * n + r * i) * A, e[6] = d * A, e[7] = (-u * n + s * c) * A, e[8] = (o * n - s * i) * A, e) : null;
}
function xl(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], a = e[6], c = e[7], u = e[8];
  return t * (u * i - o * c) + n * (-u * r + o * a) + s * (c * r - i * a);
}
function Dr(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = n[0], d = n[1], A = n[2], g = n[3], p = n[4], y = n[5], _ = n[6], b = n[7], w = n[8];
  return e[0] = f * s + d * o + A * u, e[1] = f * r + d * a + A * l, e[2] = f * i + d * c + A * h, e[3] = g * s + p * o + y * u, e[4] = g * r + p * a + y * l, e[5] = g * i + p * c + y * h, e[6] = _ * s + b * o + w * u, e[7] = _ * r + b * a + w * l, e[8] = _ * i + b * c + w * h, e;
}
function Ll(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = n[0], d = n[1];
  return e[0] = s, e[1] = r, e[2] = i, e[3] = o, e[4] = a, e[5] = c, e[6] = f * s + d * o + u, e[7] = f * r + d * a + l, e[8] = f * i + d * c + h, e;
}
function Gl(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = Math.sin(n), d = Math.cos(n);
  return e[0] = d * s + f * o, e[1] = d * r + f * a, e[2] = d * i + f * c, e[3] = d * o - f * s, e[4] = d * a - f * r, e[5] = d * c - f * i, e[6] = u, e[7] = l, e[8] = h, e;
}
function Fr(e, t, n) {
  const s = n[0], r = n[1];
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = r * t[3], e[4] = r * t[4], e[5] = r * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function Ul(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, a = s + s, c = r + r, u = n * o, l = s * o, h = s * a, f = r * o, d = r * a, A = r * c, g = i * o, p = i * a, y = i * c;
  return e[0] = 1 - h - A, e[3] = l - y, e[6] = f + p, e[1] = l + y, e[4] = 1 - u - A, e[7] = d - g, e[2] = f - p, e[5] = d + g, e[8] = 1 - u - h, e;
}
var ms;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL1ROW0 = 3] = "COL1ROW0", e[e.COL1ROW1 = 4] = "COL1ROW1", e[e.COL1ROW2 = 5] = "COL1ROW2", e[e.COL2ROW0 = 6] = "COL2ROW0", e[e.COL2ROW1 = 7] = "COL2ROW1", e[e.COL2ROW2 = 8] = "COL2ROW2";
})(ms || (ms = {}));
const Pl = Object.freeze([1, 0, 0, 0, 1, 0, 0, 0, 1]);
class K extends Fo {
  static get IDENTITY() {
    return Hl();
  }
  static get ZERO() {
    return Nl();
  }
  get ELEMENTS() {
    return 9;
  }
  get RANK() {
    return 3;
  }
  get INDICES() {
    return ms;
  }
  constructor(t, ...n) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : n.length > 0 ? this.copy([t, ...n]) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this.check();
  }
  identity() {
    return this.copy(Pl);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return Ul(this, t), this.check();
  }
  set(t, n, s, r, i, o, a, c, u) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = a, this[7] = c, this[8] = u, this.check();
  }
  setRowMajor(t, n, s, r, i, o, a, c, u) {
    return this[0] = t, this[1] = r, this[2] = a, this[3] = n, this[4] = i, this[5] = c, this[6] = s, this[7] = o, this[8] = u, this.check();
  }
  determinant() {
    return xl(this);
  }
  transpose() {
    return Ol(this, this), this.check();
  }
  invert() {
    return vl(this, this), this.check();
  }
  multiplyLeft(t) {
    return Dr(this, t, this), this.check();
  }
  multiplyRight(t) {
    return Dr(this, this, t), this.check();
  }
  rotate(t) {
    return Gl(this, this, t), this.check();
  }
  scale(t) {
    return Array.isArray(t) ? Fr(this, this, t) : Fr(this, this, [t, t]), this.check();
  }
  translate(t) {
    return Ll(this, this, t), this.check();
  }
  transform(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = Eo(n || [-0, -0], t, this);
        break;
      case 3:
        s = So(n || [-0, -0, -0], t, this);
        break;
      case 4:
        s = Mo(n || [-0, -0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Ce(s, t.length), s;
  }
  transformVector(t, n) {
    return this.transform(t, n);
  }
  transformVector2(t, n) {
    return this.transform(t, n);
  }
  transformVector3(t, n) {
    return this.transform(t, n);
  }
}
let He, Je = null;
function Nl() {
  return He || (He = new K([0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(He)), He;
}
function Hl() {
  return Je || (Je = new K(), Object.freeze(Je)), Je;
}
function Jl(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Vl(e, t) {
  if (e === t) {
    const n = t[1], s = t[2], r = t[3], i = t[6], o = t[7], a = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = s, e[9] = i, e[11] = t[14], e[12] = r, e[13] = o, e[14] = a;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function kl(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = t[4], a = t[5], c = t[6], u = t[7], l = t[8], h = t[9], f = t[10], d = t[11], A = t[12], g = t[13], p = t[14], y = t[15], _ = n * a - s * o, b = n * c - r * o, w = n * u - i * o, M = s * c - r * a, C = s * u - i * a, D = r * u - i * c, F = l * g - h * A, I = l * p - f * A, S = l * y - d * A, V = h * p - f * g, W = h * y - d * g, k = f * y - d * p;
  let O = _ * k - b * W + w * V + M * S - C * I + D * F;
  return O ? (O = 1 / O, e[0] = (a * k - c * W + u * V) * O, e[1] = (r * W - s * k - i * V) * O, e[2] = (g * D - p * C + y * M) * O, e[3] = (f * C - h * D - d * M) * O, e[4] = (c * S - o * k - u * I) * O, e[5] = (n * k - r * S + i * I) * O, e[6] = (p * w - A * D - y * b) * O, e[7] = (l * D - f * w + d * b) * O, e[8] = (o * W - a * S + u * F) * O, e[9] = (s * S - n * W - i * F) * O, e[10] = (A * C - g * w + y * _) * O, e[11] = (h * w - l * C - d * _) * O, e[12] = (a * I - o * V - c * F) * O, e[13] = (n * V - s * I + r * F) * O, e[14] = (g * b - A * M - p * _) * O, e[15] = (l * M - h * b + f * _) * O, e) : null;
}
function jl(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3], i = e[4], o = e[5], a = e[6], c = e[7], u = e[8], l = e[9], h = e[10], f = e[11], d = e[12], A = e[13], g = e[14], p = e[15], y = t * o - n * i, _ = t * a - s * i, b = n * a - s * o, w = u * A - l * d, M = u * g - h * d, C = l * g - h * A, D = t * C - n * M + s * w, F = i * C - o * M + a * w, I = u * b - l * _ + h * y, S = d * b - A * _ + g * y;
  return c * D - r * F + p * I - f * S;
}
function Or(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = t[4], c = t[5], u = t[6], l = t[7], h = t[8], f = t[9], d = t[10], A = t[11], g = t[12], p = t[13], y = t[14], _ = t[15];
  let b = n[0], w = n[1], M = n[2], C = n[3];
  return e[0] = b * s + w * a + M * h + C * g, e[1] = b * r + w * c + M * f + C * p, e[2] = b * i + w * u + M * d + C * y, e[3] = b * o + w * l + M * A + C * _, b = n[4], w = n[5], M = n[6], C = n[7], e[4] = b * s + w * a + M * h + C * g, e[5] = b * r + w * c + M * f + C * p, e[6] = b * i + w * u + M * d + C * y, e[7] = b * o + w * l + M * A + C * _, b = n[8], w = n[9], M = n[10], C = n[11], e[8] = b * s + w * a + M * h + C * g, e[9] = b * r + w * c + M * f + C * p, e[10] = b * i + w * u + M * d + C * y, e[11] = b * o + w * l + M * A + C * _, b = n[12], w = n[13], M = n[14], C = n[15], e[12] = b * s + w * a + M * h + C * g, e[13] = b * r + w * c + M * f + C * p, e[14] = b * i + w * u + M * d + C * y, e[15] = b * o + w * l + M * A + C * _, e;
}
function Kl(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  let o, a, c, u, l, h, f, d, A, g, p, y;
  return t === e ? (e[12] = t[0] * s + t[4] * r + t[8] * i + t[12], e[13] = t[1] * s + t[5] * r + t[9] * i + t[13], e[14] = t[2] * s + t[6] * r + t[10] * i + t[14], e[15] = t[3] * s + t[7] * r + t[11] * i + t[15]) : (o = t[0], a = t[1], c = t[2], u = t[3], l = t[4], h = t[5], f = t[6], d = t[7], A = t[8], g = t[9], p = t[10], y = t[11], e[0] = o, e[1] = a, e[2] = c, e[3] = u, e[4] = l, e[5] = h, e[6] = f, e[7] = d, e[8] = A, e[9] = g, e[10] = p, e[11] = y, e[12] = o * s + l * r + A * i + t[12], e[13] = a * s + h * r + g * i + t[13], e[14] = c * s + f * r + p * i + t[14], e[15] = u * s + d * r + y * i + t[15]), e;
}
function zl(e, t, n) {
  const s = n[0], r = n[1], i = n[2];
  return e[0] = t[0] * s, e[1] = t[1] * s, e[2] = t[2] * s, e[3] = t[3] * s, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * i, e[9] = t[9] * i, e[10] = t[10] * i, e[11] = t[11] * i, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function Wl(e, t, n, s) {
  let r = s[0], i = s[1], o = s[2], a = Math.sqrt(r * r + i * i + o * o), c, u, l, h, f, d, A, g, p, y, _, b, w, M, C, D, F, I, S, V, W, k, O, st;
  return a < Te ? null : (a = 1 / a, r *= a, i *= a, o *= a, u = Math.sin(n), c = Math.cos(n), l = 1 - c, h = t[0], f = t[1], d = t[2], A = t[3], g = t[4], p = t[5], y = t[6], _ = t[7], b = t[8], w = t[9], M = t[10], C = t[11], D = r * r * l + c, F = i * r * l + o * u, I = o * r * l - i * u, S = r * i * l - o * u, V = i * i * l + c, W = o * i * l + r * u, k = r * o * l + i * u, O = i * o * l - r * u, st = o * o * l + c, e[0] = h * D + g * F + b * I, e[1] = f * D + p * F + w * I, e[2] = d * D + y * F + M * I, e[3] = A * D + _ * F + C * I, e[4] = h * S + g * V + b * W, e[5] = f * S + p * V + w * W, e[6] = d * S + y * V + M * W, e[7] = A * S + _ * V + C * W, e[8] = h * k + g * O + b * st, e[9] = f * k + p * O + w * st, e[10] = d * k + y * O + M * st, e[11] = A * k + _ * O + C * st, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function Xl(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[4], o = t[5], a = t[6], c = t[7], u = t[8], l = t[9], h = t[10], f = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * r + u * s, e[5] = o * r + l * s, e[6] = a * r + h * s, e[7] = c * r + f * s, e[8] = u * r - i * s, e[9] = l * r - o * s, e[10] = h * r - a * s, e[11] = f * r - c * s, e;
}
function Ql(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], a = t[2], c = t[3], u = t[8], l = t[9], h = t[10], f = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r - u * s, e[1] = o * r - l * s, e[2] = a * r - h * s, e[3] = c * r - f * s, e[8] = i * s + u * r, e[9] = o * s + l * r, e[10] = a * s + h * r, e[11] = c * s + f * r, e;
}
function ql(e, t, n) {
  const s = Math.sin(n), r = Math.cos(n), i = t[0], o = t[1], a = t[2], c = t[3], u = t[4], l = t[5], h = t[6], f = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * r + u * s, e[1] = o * r + l * s, e[2] = a * r + h * s, e[3] = c * r + f * s, e[4] = u * r - i * s, e[5] = l * r - o * s, e[6] = h * r - a * s, e[7] = f * r - c * s, e;
}
function Yl(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[4], o = t[5], a = t[6], c = t[8], u = t[9], l = t[10];
  return e[0] = Math.sqrt(n * n + s * s + r * r), e[1] = Math.sqrt(i * i + o * o + a * a), e[2] = Math.sqrt(c * c + u * u + l * l), e;
}
function $l(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n + n, a = s + s, c = r + r, u = n * o, l = s * o, h = s * a, f = r * o, d = r * a, A = r * c, g = i * o, p = i * a, y = i * c;
  return e[0] = 1 - h - A, e[1] = l + y, e[2] = f - p, e[3] = 0, e[4] = l - y, e[5] = 1 - u - A, e[6] = d + g, e[7] = 0, e[8] = f + p, e[9] = d - g, e[10] = 1 - u - h, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Zl(e, t, n, s, r, i, o) {
  const a = 1 / (n - t), c = 1 / (r - s), u = 1 / (i - o);
  return e[0] = i * 2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i * 2 * c, e[6] = 0, e[7] = 0, e[8] = (n + t) * a, e[9] = (r + s) * c, e[10] = (o + i) * u, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * i * 2 * u, e[15] = 0, e;
}
function th(e, t, n, s, r) {
  const i = 1 / Math.tan(t / 2);
  if (e[0] = i / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, r != null && r !== 1 / 0) {
    const o = 1 / (s - r);
    e[10] = (r + s) * o, e[14] = 2 * r * s * o;
  } else
    e[10] = -1, e[14] = -2 * s;
  return e;
}
const eh = th;
function nh(e, t, n, s, r, i, o) {
  const a = 1 / (t - n), c = 1 / (s - r), u = 1 / (i - o);
  return e[0] = -2 * a, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * c, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * u, e[11] = 0, e[12] = (t + n) * a, e[13] = (r + s) * c, e[14] = (o + i) * u, e[15] = 1, e;
}
const sh = nh;
function rh(e, t, n, s) {
  let r, i, o, a, c, u, l, h, f, d;
  const A = t[0], g = t[1], p = t[2], y = s[0], _ = s[1], b = s[2], w = n[0], M = n[1], C = n[2];
  return Math.abs(A - w) < Te && Math.abs(g - M) < Te && Math.abs(p - C) < Te ? Jl(e) : (h = A - w, f = g - M, d = p - C, r = 1 / Math.sqrt(h * h + f * f + d * d), h *= r, f *= r, d *= r, i = _ * d - b * f, o = b * h - y * d, a = y * f - _ * h, r = Math.sqrt(i * i + o * o + a * a), r ? (r = 1 / r, i *= r, o *= r, a *= r) : (i = 0, o = 0, a = 0), c = f * a - d * o, u = d * i - h * a, l = h * o - f * i, r = Math.sqrt(c * c + u * u + l * l), r ? (r = 1 / r, c *= r, u *= r, l *= r) : (c = 0, u = 0, l = 0), e[0] = i, e[1] = c, e[2] = h, e[3] = 0, e[4] = o, e[5] = u, e[6] = f, e[7] = 0, e[8] = a, e[9] = l, e[10] = d, e[11] = 0, e[12] = -(i * A + o * g + a * p), e[13] = -(c * A + u * g + l * p), e[14] = -(h * A + f * g + d * p), e[15] = 1, e);
}
function ih() {
  const e = new _t(4);
  return _t != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function oh(e, t, n) {
  return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e;
}
function ah(e, t, n) {
  return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e;
}
function ch(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return Math.sqrt(t * t + n * n + s * s + r * r);
}
function uh(e) {
  const t = e[0], n = e[1], s = e[2], r = e[3];
  return t * t + n * n + s * s + r * r;
}
function lh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3];
  let o = n * n + s * s + r * r + i * i;
  return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = n * o, e[1] = s * o, e[2] = r * o, e[3] = i * o, e;
}
function hh(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function fh(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], a = t[3];
  return e[0] = r + s * (n[0] - r), e[1] = i + s * (n[1] - i), e[2] = o + s * (n[2] - o), e[3] = a + s * (n[3] - a), e;
}
function dh(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3];
  return e[0] = n[0] * s + n[4] * r + n[8] * i + n[12] * o, e[1] = n[1] * s + n[5] * r + n[9] * i + n[13] * o, e[2] = n[2] * s + n[6] * r + n[10] * i + n[14] * o, e[3] = n[3] * s + n[7] * r + n[11] * i + n[15] * o, e;
}
function mh(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = n[0], a = n[1], c = n[2], u = n[3], l = u * s + a * i - c * r, h = u * r + c * s - o * i, f = u * i + o * r - a * s, d = -o * s - a * r - c * i;
  return e[0] = l * u + d * -o + h * -c - f * -a, e[1] = h * u + d * -a + f * -o - l * -c, e[2] = f * u + d * -c + l * -a - h * -o, e[3] = t[3], e;
}
(function() {
  const e = ih();
  return function(t, n, s, r, i, o) {
    let a, c;
    for (n || (n = 4), s || (s = 0), r ? c = Math.min(r * n + s, t.length) : c = t.length, a = s; a < c; a += n)
      e[0] = t[a], e[1] = t[a + 1], e[2] = t[a + 2], e[3] = t[a + 3], i(e, e, o), t[a] = e[0], t[a + 1] = e[1], t[a + 2] = e[2], t[a + 3] = e[3];
    return t;
  };
})();
var As;
(function(e) {
  e[e.COL0ROW0 = 0] = "COL0ROW0", e[e.COL0ROW1 = 1] = "COL0ROW1", e[e.COL0ROW2 = 2] = "COL0ROW2", e[e.COL0ROW3 = 3] = "COL0ROW3", e[e.COL1ROW0 = 4] = "COL1ROW0", e[e.COL1ROW1 = 5] = "COL1ROW1", e[e.COL1ROW2 = 6] = "COL1ROW2", e[e.COL1ROW3 = 7] = "COL1ROW3", e[e.COL2ROW0 = 8] = "COL2ROW0", e[e.COL2ROW1 = 9] = "COL2ROW1", e[e.COL2ROW2 = 10] = "COL2ROW2", e[e.COL2ROW3 = 11] = "COL2ROW3", e[e.COL3ROW0 = 12] = "COL3ROW0", e[e.COL3ROW1 = 13] = "COL3ROW1", e[e.COL3ROW2 = 14] = "COL3ROW2", e[e.COL3ROW3 = 15] = "COL3ROW3";
})(As || (As = {}));
const Ah = 45 * Math.PI / 180, gh = 1, Hn = 0.1, Jn = 500, ph = Object.freeze([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
class N extends Fo {
  static get IDENTITY() {
    return yh();
  }
  static get ZERO() {
    return Bh();
  }
  get ELEMENTS() {
    return 16;
  }
  get RANK() {
    return 4;
  }
  get INDICES() {
    return As;
  }
  constructor(t) {
    super(-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0), arguments.length === 1 && Array.isArray(t) ? this.copy(t) : this.identity();
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this[4] = t[4], this[5] = t[5], this[6] = t[6], this[7] = t[7], this[8] = t[8], this[9] = t[9], this[10] = t[10], this[11] = t[11], this[12] = t[12], this[13] = t[13], this[14] = t[14], this[15] = t[15], this.check();
  }
  set(t, n, s, r, i, o, a, c, u, l, h, f, d, A, g, p) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this[4] = i, this[5] = o, this[6] = a, this[7] = c, this[8] = u, this[9] = l, this[10] = h, this[11] = f, this[12] = d, this[13] = A, this[14] = g, this[15] = p, this.check();
  }
  setRowMajor(t, n, s, r, i, o, a, c, u, l, h, f, d, A, g, p) {
    return this[0] = t, this[1] = i, this[2] = u, this[3] = d, this[4] = n, this[5] = o, this[6] = l, this[7] = A, this[8] = s, this[9] = a, this[10] = h, this[11] = g, this[12] = r, this[13] = c, this[14] = f, this[15] = p, this.check();
  }
  toRowMajor(t) {
    return t[0] = this[0], t[1] = this[4], t[2] = this[8], t[3] = this[12], t[4] = this[1], t[5] = this[5], t[6] = this[9], t[7] = this[13], t[8] = this[2], t[9] = this[6], t[10] = this[10], t[11] = this[14], t[12] = this[3], t[13] = this[7], t[14] = this[11], t[15] = this[15], t;
  }
  identity() {
    return this.copy(ph);
  }
  fromObject(t) {
    return this.check();
  }
  fromQuaternion(t) {
    return $l(this, t), this.check();
  }
  frustum(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = Hn,
      far: a = Jn
    } = t;
    return a === 1 / 0 ? Ch(this, n, s, r, i, o) : Zl(this, n, s, r, i, o, a), this.check();
  }
  lookAt(t) {
    const {
      eye: n,
      center: s = [0, 0, 0],
      up: r = [0, 1, 0]
    } = t;
    return rh(this, n, s, r), this.check();
  }
  ortho(t) {
    const {
      left: n,
      right: s,
      bottom: r,
      top: i,
      near: o = Hn,
      far: a = Jn
    } = t;
    return sh(this, n, s, r, i, o, a), this.check();
  }
  orthographic(t) {
    const {
      fovy: n = Ah,
      aspect: s = gh,
      focalDistance: r = 1,
      near: i = Hn,
      far: o = Jn
    } = t;
    vr(n);
    const a = n / 2, c = r * Math.tan(a), u = c * s;
    return this.ortho({
      left: -u,
      right: u,
      bottom: -c,
      top: c,
      near: i,
      far: o
    });
  }
  perspective(t) {
    const {
      fovy: n = 45 * Math.PI / 180,
      aspect: s = 1,
      near: r = 0.1,
      far: i = 500
    } = t;
    return vr(n), eh(this, n, s, r, i), this.check();
  }
  determinant() {
    return jl(this);
  }
  getScale(t = [-0, -0, -0]) {
    return t[0] = Math.sqrt(this[0] * this[0] + this[1] * this[1] + this[2] * this[2]), t[1] = Math.sqrt(this[4] * this[4] + this[5] * this[5] + this[6] * this[6]), t[2] = Math.sqrt(this[8] * this[8] + this[9] * this[9] + this[10] * this[10]), t;
  }
  getTranslation(t = [-0, -0, -0]) {
    return t[0] = this[12], t[1] = this[13], t[2] = this[14], t;
  }
  getRotation(t, n) {
    t = t || [-0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0, -0], n = n || [-0, -0, -0];
    const s = this.getScale(n), r = 1 / s[0], i = 1 / s[1], o = 1 / s[2];
    return t[0] = this[0] * r, t[1] = this[1] * i, t[2] = this[2] * o, t[3] = 0, t[4] = this[4] * r, t[5] = this[5] * i, t[6] = this[6] * o, t[7] = 0, t[8] = this[8] * r, t[9] = this[9] * i, t[10] = this[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
  }
  getRotationMatrix3(t, n) {
    t = t || [-0, -0, -0, -0, -0, -0, -0, -0, -0], n = n || [-0, -0, -0];
    const s = this.getScale(n), r = 1 / s[0], i = 1 / s[1], o = 1 / s[2];
    return t[0] = this[0] * r, t[1] = this[1] * i, t[2] = this[2] * o, t[3] = this[4] * r, t[4] = this[5] * i, t[5] = this[6] * o, t[6] = this[8] * r, t[7] = this[9] * i, t[8] = this[10] * o, t;
  }
  transpose() {
    return Vl(this, this), this.check();
  }
  invert() {
    return kl(this, this), this.check();
  }
  multiplyLeft(t) {
    return Or(this, t, this), this.check();
  }
  multiplyRight(t) {
    return Or(this, this, t), this.check();
  }
  rotateX(t) {
    return Xl(this, this, t), this.check();
  }
  rotateY(t) {
    return Ql(this, this, t), this.check();
  }
  rotateZ(t) {
    return ql(this, this, t), this.check();
  }
  rotateXYZ(t) {
    return this.rotateX(t[0]).rotateY(t[1]).rotateZ(t[2]);
  }
  rotateAxis(t, n) {
    return Wl(this, this, t, n), this.check();
  }
  scale(t) {
    return zl(this, this, Array.isArray(t) ? t : [t, t, t]), this.check();
  }
  translate(t) {
    return Kl(this, this, t), this.check();
  }
  transform(t, n) {
    return t.length === 4 ? (n = dh(n || [-0, -0, -0, -0], t, this), Ce(n, 4), n) : this.transformAsPoint(t, n);
  }
  transformAsPoint(t, n) {
    const {
      length: s
    } = t;
    let r;
    switch (s) {
      case 2:
        r = bo(n || [-0, -0], t, this);
        break;
      case 3:
        r = Hs(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Ce(r, t.length), r;
  }
  transformAsVector(t, n) {
    let s;
    switch (t.length) {
      case 2:
        s = _o(n || [-0, -0], t, this);
        break;
      case 3:
        s = wo(n || [-0, -0, -0], t, this);
        break;
      default:
        throw new Error("Illegal vector");
    }
    return Ce(s, t.length), s;
  }
  transformPoint(t, n) {
    return this.transformAsPoint(t, n);
  }
  transformVector(t, n) {
    return this.transformAsPoint(t, n);
  }
  transformDirection(t, n) {
    return this.transformAsVector(t, n);
  }
  makeRotationX(t) {
    return this.identity().rotateX(t);
  }
  makeTranslation(t, n, s) {
    return this.identity().translate([t, n, s]);
  }
}
let Ve, ke;
function Bh() {
  return Ve || (Ve = new N([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), Object.freeze(Ve)), Ve;
}
function yh() {
  return ke || (ke = new N(), Object.freeze(ke)), ke;
}
function vr(e) {
  if (e > Math.PI * 2)
    throw Error("expected radians");
}
function Ch(e, t, n, s, r, i) {
  const o = 2 * i / (n - t), a = 2 * i / (r - s), c = (n + t) / (n - t), u = (r + s) / (r - s), l = -1, h = -1, f = -2 * i;
  return e[0] = o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a, e[6] = 0, e[7] = 0, e[8] = c, e[9] = u, e[10] = l, e[11] = h, e[12] = 0, e[13] = 0, e[14] = f, e[15] = 0, e;
}
function xr() {
  const e = new _t(4);
  return _t != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function Th(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function Oo(e, t, n) {
  n = n * 0.5;
  const s = Math.sin(n);
  return e[0] = s * t[0], e[1] = s * t[1], e[2] = s * t[2], e[3] = Math.cos(n), e;
}
function Lr(e, t, n) {
  const s = t[0], r = t[1], i = t[2], o = t[3], a = n[0], c = n[1], u = n[2], l = n[3];
  return e[0] = s * l + o * a + r * u - i * c, e[1] = r * l + o * c + i * a - s * u, e[2] = i * l + o * u + s * c - r * a, e[3] = o * l - s * a - r * c - i * u, e;
}
function Eh(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c + o * a, e[1] = r * c + i * a, e[2] = i * c - r * a, e[3] = o * c - s * a, e;
}
function bh(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c - i * a, e[1] = r * c + o * a, e[2] = i * c + s * a, e[3] = o * c - r * a, e;
}
function _h(e, t, n) {
  n *= 0.5;
  const s = t[0], r = t[1], i = t[2], o = t[3], a = Math.sin(n), c = Math.cos(n);
  return e[0] = s * c + r * a, e[1] = r * c - s * a, e[2] = i * c + o * a, e[3] = o * c - i * a, e;
}
function wh(e, t) {
  const n = t[0], s = t[1], r = t[2];
  return e[0] = n, e[1] = s, e[2] = r, e[3] = Math.sqrt(Math.abs(1 - n * n - s * s - r * r)), e;
}
function sn(e, t, n, s) {
  const r = t[0], i = t[1], o = t[2], a = t[3];
  let c = n[0], u = n[1], l = n[2], h = n[3], f, d, A, g, p;
  return f = r * c + i * u + o * l + a * h, f < 0 && (f = -f, c = -c, u = -u, l = -l, h = -h), 1 - f > Te ? (d = Math.acos(f), p = Math.sin(d), A = Math.sin((1 - s) * d) / p, g = Math.sin(s * d) / p) : (A = 1 - s, g = s), e[0] = A * r + g * c, e[1] = A * i + g * u, e[2] = A * o + g * l, e[3] = A * a + g * h, e;
}
function Mh(e, t) {
  const n = t[0], s = t[1], r = t[2], i = t[3], o = n * n + s * s + r * r + i * i, a = o ? 1 / o : 0;
  return e[0] = -n * a, e[1] = -s * a, e[2] = -r * a, e[3] = i * a, e;
}
function Rh(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function vo(e, t) {
  const n = t[0] + t[4] + t[8];
  let s;
  if (n > 0)
    s = Math.sqrt(n + 1), e[3] = 0.5 * s, s = 0.5 / s, e[0] = (t[5] - t[7]) * s, e[1] = (t[6] - t[2]) * s, e[2] = (t[1] - t[3]) * s;
  else {
    let r = 0;
    t[4] > t[0] && (r = 1), t[8] > t[r * 3 + r] && (r = 2);
    const i = (r + 1) % 3, o = (r + 2) % 3;
    s = Math.sqrt(t[r * 3 + r] - t[i * 3 + i] - t[o * 3 + o] + 1), e[r] = 0.5 * s, s = 0.5 / s, e[3] = (t[i * 3 + o] - t[o * 3 + i]) * s, e[i] = (t[i * 3 + r] + t[r * 3 + i]) * s, e[o] = (t[o * 3 + r] + t[r * 3 + o]) * s;
  }
  return e;
}
const Ih = oh, Sh = ah, Dh = hh, Fh = fh, Oh = ch, vh = uh, xo = lh, xh = function() {
  const e = Ro(), t = Sr(1, 0, 0), n = Sr(0, 1, 0);
  return function(s, r, i) {
    const o = Ns(r, i);
    return o < -0.999999 ? (nn(e, t, r), Dl(e) < 1e-6 && nn(e, n, r), wl(e, e), Oo(s, e, Math.PI), s) : o > 0.999999 ? (s[0] = 0, s[1] = 0, s[2] = 0, s[3] = 1, s) : (nn(e, r, i), s[0] = e[0], s[1] = e[1], s[2] = e[2], s[3] = 1 + o, xo(s, s));
  };
}();
(function() {
  const e = xr(), t = xr();
  return function(n, s, r, i, o, a) {
    return sn(e, s, o, a), sn(t, r, i, a), sn(n, e, t, 2 * a * (1 - a)), n;
  };
})();
(function() {
  const e = Fl();
  return function(t, n, s, r) {
    return e[0] = s[0], e[3] = s[1], e[6] = s[2], e[1] = r[0], e[4] = r[1], e[7] = r[2], e[2] = -n[0], e[5] = -n[1], e[8] = -n[2], xo(t, vo(t, e));
  };
})();
const Lh = [0, 0, 0, 1];
class hn extends Us {
  constructor(t = 0, n = 0, s = 0, r = 1) {
    super(-0, -0, -0, -0), Array.isArray(t) && arguments.length === 1 ? this.copy(t) : this.set(t, n, s, r);
  }
  copy(t) {
    return this[0] = t[0], this[1] = t[1], this[2] = t[2], this[3] = t[3], this.check();
  }
  set(t, n, s, r) {
    return this[0] = t, this[1] = n, this[2] = s, this[3] = r, this.check();
  }
  fromObject(t) {
    return this[0] = t.x, this[1] = t.y, this[2] = t.z, this[3] = t.w, this.check();
  }
  fromMatrix3(t) {
    return vo(this, t), this.check();
  }
  fromAxisRotation(t, n) {
    return Oo(this, t, n), this.check();
  }
  identity() {
    return Th(this), this.check();
  }
  setAxisAngle(t, n) {
    return this.fromAxisRotation(t, n);
  }
  get ELEMENTS() {
    return 4;
  }
  get x() {
    return this[0];
  }
  set x(t) {
    this[0] = G(t);
  }
  get y() {
    return this[1];
  }
  set y(t) {
    this[1] = G(t);
  }
  get z() {
    return this[2];
  }
  set z(t) {
    this[2] = G(t);
  }
  get w() {
    return this[3];
  }
  set w(t) {
    this[3] = G(t);
  }
  len() {
    return Oh(this);
  }
  lengthSquared() {
    return vh(this);
  }
  dot(t) {
    return Dh(this, t);
  }
  rotationTo(t, n) {
    return xh(this, t, n), this.check();
  }
  add(t) {
    return Ih(this, this, t), this.check();
  }
  calculateW() {
    return wh(this, this), this.check();
  }
  conjugate() {
    return Rh(this, this), this.check();
  }
  invert() {
    return Mh(this, this), this.check();
  }
  lerp(t, n, s) {
    return s === void 0 ? this.lerp(this, t, n) : (Fh(this, t, n, s), this.check());
  }
  multiplyRight(t) {
    return Lr(this, this, t), this.check();
  }
  multiplyLeft(t) {
    return Lr(this, t, this), this.check();
  }
  normalize() {
    const t = this.len(), n = t > 0 ? 1 / t : 0;
    return this[0] = this[0] * n, this[1] = this[1] * n, this[2] = this[2] * n, this[3] = this[3] * n, t === 0 && (this[3] = 1), this.check();
  }
  rotateX(t) {
    return Eh(this, this, t), this.check();
  }
  rotateY(t) {
    return bh(this, this, t), this.check();
  }
  rotateZ(t) {
    return _h(this, this, t), this.check();
  }
  scale(t) {
    return Sh(this, this, t), this.check();
  }
  slerp(t, n, s) {
    let r, i, o;
    switch (arguments.length) {
      case 1:
        ({
          start: r = Lh,
          target: i,
          ratio: o
        } = t);
        break;
      case 2:
        r = this, i = t, o = n;
        break;
      default:
        r = t, i = n, o = s;
    }
    return sn(this, r, i, o), this.check();
  }
  transformVector4(t, n = new Js()) {
    return mh(n, t, this), Ce(n, 4);
  }
  lengthSq() {
    return this.lengthSquared();
  }
  setFromAxisAngle(t, n) {
    return this.setAxisAngle(t, n);
  }
  premultiply(t) {
    return this.multiplyLeft(t);
  }
  multiply(t) {
    return this.multiplyRight(t);
  }
}
function we(e) {
  "@babel/helpers - typeof";
  return we = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, we(e);
}
function Gh(e, t) {
  if (we(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var s = n.call(e, t || "default");
    if (we(s) != "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Uh(e) {
  var t = Gh(e, "string");
  return we(t) == "symbol" ? t : String(t);
}
function R(e, t, n) {
  return t = Uh(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
const Ph = 0.1, Nh = 1e-12, Lo = 1e-15, Hh = 1e-20, Jh = 6378137, Vh = 6378137, kh = 6356752314245179e-9;
function _n(e) {
  return e;
}
new m();
function jh(e, t = [], n = _n) {
  return "longitude" in e ? (t[0] = n(e.longitude), t[1] = n(e.latitude), t[2] = e.height) : "x" in e ? (t[0] = n(e.x), t[1] = n(e.y), t[2] = e.z) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function Kh(e, t = []) {
  return jh(e, t, q._cartographicRadians ? _n : ds);
}
function zh(e, t, n = _n) {
  return "longitude" in t ? (t.longitude = n(e[0]), t.latitude = n(e[1]), t.height = e[2]) : "x" in t ? (t.x = n(e[0]), t.y = n(e[1]), t.z = e[2]) : (t[0] = n(e[0]), t[1] = n(e[1]), t[2] = e[2]), t;
}
function Wh(e, t) {
  return zh(e, t, q._cartographicRadians ? _n : dl);
}
const Gr = 1e-14, Xh = new m(), Ur = {
  up: {
    south: "east",
    north: "west",
    west: "south",
    east: "north"
  },
  down: {
    south: "west",
    north: "east",
    west: "north",
    east: "south"
  },
  south: {
    up: "west",
    down: "east",
    west: "down",
    east: "up"
  },
  north: {
    up: "east",
    down: "west",
    west: "up",
    east: "down"
  },
  west: {
    up: "north",
    down: "south",
    north: "down",
    south: "up"
  },
  east: {
    up: "south",
    down: "north",
    north: "up",
    south: "down"
  }
}, Vn = {
  north: [-1, 0, 0],
  east: [0, 1, 0],
  up: [0, 0, 1],
  south: [1, 0, 0],
  west: [0, -1, 0],
  down: [0, 0, -1]
}, he = {
  east: new m(),
  north: new m(),
  up: new m(),
  west: new m(),
  south: new m(),
  down: new m()
}, Qh = new m(), qh = new m(), Yh = new m();
function Pr(e, t, n, s, r, i) {
  const o = Ur[t] && Ur[t][n];
  J(o && (!s || s === o));
  let a, c, u;
  const l = Xh.copy(r);
  if (Ht(l.x, 0, Gr) && Ht(l.y, 0, Gr)) {
    const f = Math.sign(l.z);
    a = Qh.fromArray(Vn[t]), t !== "east" && t !== "west" && a.scale(f), c = qh.fromArray(Vn[n]), n !== "east" && n !== "west" && c.scale(f), u = Yh.fromArray(Vn[s]), s !== "east" && s !== "west" && u.scale(f);
  } else {
    const {
      up: f,
      east: d,
      north: A
    } = he;
    d.set(-l.y, l.x, 0).normalize(), e.geodeticSurfaceNormal(l, f), A.copy(f).cross(d);
    const {
      down: g,
      west: p,
      south: y
    } = he;
    g.copy(f).scale(-1), p.copy(d).scale(-1), y.copy(A).scale(-1), a = he[t], c = he[n], u = he[s];
  }
  return i[0] = a.x, i[1] = a.y, i[2] = a.z, i[3] = 0, i[4] = c.x, i[5] = c.y, i[6] = c.z, i[7] = 0, i[8] = u.x, i[9] = u.y, i[10] = u.z, i[11] = 0, i[12] = l.x, i[13] = l.y, i[14] = l.z, i[15] = 1, i;
}
const ee = new m(), $h = new m(), Zh = new m();
function tf(e, t, n = []) {
  const {
    oneOverRadii: s,
    oneOverRadiiSquared: r,
    centerToleranceSquared: i
  } = t;
  ee.from(e);
  const o = ee.x, a = ee.y, c = ee.z, u = s.x, l = s.y, h = s.z, f = o * o * u * u, d = a * a * l * l, A = c * c * h * h, g = f + d + A, p = Math.sqrt(1 / g);
  if (!Number.isFinite(p))
    return;
  const y = $h;
  if (y.copy(e).scale(p), g < i)
    return y.to(n);
  const _ = r.x, b = r.y, w = r.z, M = Zh;
  M.set(y.x * _ * 2, y.y * b * 2, y.z * w * 2);
  let C = (1 - p) * ee.len() / (0.5 * M.len()), D = 0, F, I, S, V;
  do {
    C -= D, F = 1 / (1 + C * _), I = 1 / (1 + C * b), S = 1 / (1 + C * w);
    const W = F * F, k = I * I, O = S * S, st = W * F, Yt = k * I, ue = O * S;
    V = f * W + d * k + A * O - 1;
    const ut = -2 * (f * st * _ + d * Yt * b + A * ue * w);
    D = V / ut;
  } while (Math.abs(V) > Nh);
  return ee.scale([F, I, S]).to(n);
}
const je = new m(), Nr = new m(), ef = new m(), Tt = new m(), nf = new m(), Ke = new m();
class H {
  constructor(t = 0, n = 0, s = 0) {
    R(this, "radii", void 0), R(this, "radiiSquared", void 0), R(this, "radiiToTheFourth", void 0), R(this, "oneOverRadii", void 0), R(this, "oneOverRadiiSquared", void 0), R(this, "minimumRadius", void 0), R(this, "maximumRadius", void 0), R(this, "centerToleranceSquared", Ph), R(this, "squaredXOverSquaredZ", void 0), J(t >= 0), J(n >= 0), J(s >= 0), this.radii = new m(t, n, s), this.radiiSquared = new m(t * t, n * n, s * s), this.radiiToTheFourth = new m(t * t * t * t, n * n * n * n, s * s * s * s), this.oneOverRadii = new m(t === 0 ? 0 : 1 / t, n === 0 ? 0 : 1 / n, s === 0 ? 0 : 1 / s), this.oneOverRadiiSquared = new m(t === 0 ? 0 : 1 / (t * t), n === 0 ? 0 : 1 / (n * n), s === 0 ? 0 : 1 / (s * s)), this.minimumRadius = Math.min(t, n, s), this.maximumRadius = Math.max(t, n, s), this.radiiSquared.z !== 0 && (this.squaredXOverSquaredZ = this.radiiSquared.x / this.radiiSquared.z), Object.freeze(this);
  }
  equals(t) {
    return this === t || !!(t && this.radii.equals(t.radii));
  }
  toString() {
    return this.radii.toString();
  }
  cartographicToCartesian(t, n = [0, 0, 0]) {
    const s = Nr, r = ef, [, , i] = t;
    this.geodeticSurfaceNormalCartographic(t, s), r.copy(this.radiiSquared).scale(s);
    const o = Math.sqrt(s.dot(r));
    return r.scale(1 / o), s.scale(i), r.add(s), r.to(n);
  }
  cartesianToCartographic(t, n = [0, 0, 0]) {
    Ke.from(t);
    const s = this.scaleToGeodeticSurface(Ke, Tt);
    if (!s)
      return;
    const r = this.geodeticSurfaceNormal(s, Nr), i = nf;
    i.copy(Ke).subtract(s);
    const o = Math.atan2(r.y, r.x), a = Math.asin(r.z), c = Math.sign(Ns(i, Ke)) * Io(i);
    return Wh([o, a, c], n);
  }
  eastNorthUpToFixedFrame(t, n = new N()) {
    return Pr(this, "east", "north", "up", t, n);
  }
  localFrameToFixedFrame(t, n, s, r, i = new N()) {
    return Pr(this, t, n, s, r, i);
  }
  geocentricSurfaceNormal(t, n = [0, 0, 0]) {
    return je.from(t).normalize().to(n);
  }
  geodeticSurfaceNormalCartographic(t, n = [0, 0, 0]) {
    const s = Kh(t), r = s[0], i = s[1], o = Math.cos(i);
    return je.set(o * Math.cos(r), o * Math.sin(r), Math.sin(i)).normalize(), je.to(n);
  }
  geodeticSurfaceNormal(t, n = [0, 0, 0]) {
    return je.from(t).scale(this.oneOverRadiiSquared).normalize().to(n);
  }
  scaleToGeodeticSurface(t, n) {
    return tf(t, this, n);
  }
  scaleToGeocentricSurface(t, n = [0, 0, 0]) {
    Tt.from(t);
    const s = Tt.x, r = Tt.y, i = Tt.z, o = this.oneOverRadiiSquared, a = 1 / Math.sqrt(s * s * o.x + r * r * o.y + i * i * o.z);
    return Tt.multiplyScalar(a).to(n);
  }
  transformPositionToScaledSpace(t, n = [0, 0, 0]) {
    return Tt.from(t).scale(this.oneOverRadii).to(n);
  }
  transformPositionFromScaledSpace(t, n = [0, 0, 0]) {
    return Tt.from(t).scale(this.radii).to(n);
  }
  getSurfaceNormalIntersectionWithZAxis(t, n = 0, s = [0, 0, 0]) {
    J(Ht(this.radii.x, this.radii.y, Lo)), J(this.radii.z > 0), Tt.from(t);
    const r = Tt.z * (1 - this.squaredXOverSquaredZ);
    if (!(Math.abs(r) >= this.radii.z - n))
      return Tt.set(0, 0, r).to(s);
  }
}
R(H, "WGS84", new H(Jh, Vh, kh));
class sf {
  constructor(t, n, s) {
    this.item = void 0, this.previous = void 0, this.next = void 0, this.item = t, this.previous = n, this.next = s;
  }
}
class rf {
  constructor() {
    this.head = null, this.tail = null, this._length = 0;
  }
  get length() {
    return this._length;
  }
  add(t) {
    const n = new sf(t, this.tail, null);
    return this.tail ? (this.tail.next = n, this.tail = n) : (this.head = n, this.tail = n), ++this._length, n;
  }
  remove(t) {
    t && (t.previous && t.next ? (t.previous.next = t.next, t.next.previous = t.previous) : t.previous ? (t.previous.next = null, this.tail = t.previous) : t.next ? (t.next.previous = null, this.head = t.next) : (this.head = null, this.tail = null), t.next = null, t.previous = null, --this._length);
  }
  splice(t, n) {
    t !== n && (this.remove(n), this._insert(t, n));
  }
  _insert(t, n) {
    const s = t.next;
    t.next = n, this.tail === t ? this.tail = n : s.previous = n, n.next = s, n.previous = t, ++this._length;
  }
}
class of {
  constructor() {
    this._list = void 0, this._sentinel = void 0, this._trimTiles = void 0, this._list = new rf(), this._sentinel = this._list.add("sentinel"), this._trimTiles = !1;
  }
  reset() {
    this._list.splice(this._list.tail, this._sentinel);
  }
  touch(t) {
    const n = t._cacheNode;
    n && this._list.splice(this._sentinel, n);
  }
  add(t, n, s) {
    n._cacheNode || (n._cacheNode = this._list.add(n), s && s(t, n));
  }
  unloadTile(t, n, s) {
    const r = n._cacheNode;
    r && (this._list.remove(r), n._cacheNode = null, s && s(t, n));
  }
  unloadTiles(t, n) {
    const s = this._trimTiles;
    this._trimTiles = !1;
    const r = this._list, i = t.maximumMemoryUsage * 1024 * 1024, o = this._sentinel;
    let a = r.head;
    for (; a !== o && (t.gpuMemoryUsageInBytes > i || s); ) {
      const c = a.item;
      a = a.next, this.unloadTile(t, c, n);
    }
  }
  trim() {
    this._trimTiles = !0;
  }
}
function af(e, t) {
  U(e), U(t);
  const {
    rtcCenter: n,
    gltfUpAxis: s
  } = t, {
    computedTransform: r,
    boundingVolume: {
      center: i
    }
  } = e;
  let o = new N(r);
  switch (n && o.translate(n), s) {
    case "Z":
      break;
    case "Y":
      const h = new N().rotateX(Math.PI / 2);
      o = o.multiplyRight(h);
      break;
    case "X":
      const f = new N().rotateY(-Math.PI / 2);
      o = o.multiplyRight(f);
      break;
  }
  t.isQuantized && o.translate(t.quantizedVolumeOffset).scale(t.quantizedVolumeScale);
  const a = new m(i);
  t.cartesianModelMatrix = o, t.cartesianOrigin = a;
  const c = H.WGS84.cartesianToCartographic(a, new m()), l = H.WGS84.eastNorthUpToFixedFrame(a).invert();
  t.cartographicModelMatrix = l.multiplyRight(o), t.cartographicOrigin = c, t.coordinateSystem || (t.modelMatrix = t.cartographicModelMatrix);
}
const ht = {
  OUTSIDE: -1,
  INTERSECTING: 0,
  INSIDE: 1
};
new m();
new m();
const fe = new m(), Hr = new m();
class Oe {
  constructor(t = [0, 0, 0], n = 0) {
    R(this, "center", void 0), R(this, "radius", void 0), this.radius = -0, this.center = new m(), this.fromCenterRadius(t, n);
  }
  fromCenterRadius(t, n) {
    return this.center.from(t), this.radius = n, this;
  }
  fromCornerPoints(t, n) {
    return n = fe.from(n), this.center = new m().from(t).add(n).scale(0.5), this.radius = this.center.distance(n), this;
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.radius === t.radius;
  }
  clone() {
    return new Oe(this.center, this.radius);
  }
  union(t) {
    const n = this.center, s = this.radius, r = t.center, i = t.radius, o = fe.copy(r).subtract(n), a = o.magnitude();
    if (s >= a + i)
      return this.clone();
    if (i >= a + s)
      return t.clone();
    const c = (s + a + i) * 0.5;
    return Hr.copy(o).scale((-s + c) / a).add(n), this.center.copy(Hr), this.radius = c, this;
  }
  expand(t) {
    const s = fe.from(t).subtract(this.center).magnitude();
    return s > this.radius && (this.radius = s), this;
  }
  transform(t) {
    this.center.transform(t);
    const n = Yl(fe, t);
    return this.radius = Math.max(n[0], Math.max(n[1], n[2])) * this.radius, this;
  }
  distanceSquaredTo(t) {
    const n = this.distanceTo(t);
    return n * n;
  }
  distanceTo(t) {
    const s = fe.from(t).subtract(this.center);
    return Math.max(0, s.len() - this.radius);
  }
  intersectPlane(t) {
    const n = this.center, s = this.radius, i = t.normal.dot(n) + t.distance;
    return i < -s ? ht.OUTSIDE : i < s ? ht.INTERSECTING : ht.INSIDE;
  }
}
const cf = new m(), uf = new m(), ze = new m(), We = new m(), Xe = new m(), lf = new m(), hf = new m(), Ft = {
  COLUMN0ROW0: 0,
  COLUMN0ROW1: 1,
  COLUMN0ROW2: 2,
  COLUMN1ROW0: 3,
  COLUMN1ROW1: 4,
  COLUMN1ROW2: 5,
  COLUMN2ROW0: 6,
  COLUMN2ROW1: 7,
  COLUMN2ROW2: 8
};
class ve {
  constructor(t = [0, 0, 0], n = [0, 0, 0, 0, 0, 0, 0, 0, 0]) {
    R(this, "center", void 0), R(this, "halfAxes", void 0), this.center = new m().from(t), this.halfAxes = new K(n);
  }
  get halfSize() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2);
    return [new m(t).len(), new m(n).len(), new m(s).len()];
  }
  get quaternion() {
    const t = this.halfAxes.getColumn(0), n = this.halfAxes.getColumn(1), s = this.halfAxes.getColumn(2), r = new m(t).normalize(), i = new m(n).normalize(), o = new m(s).normalize();
    return new hn().fromMatrix3(new K([...r, ...i, ...o]));
  }
  fromCenterHalfSizeQuaternion(t, n, s) {
    const r = new hn(s), i = new K().fromQuaternion(r);
    return i[0] = i[0] * n[0], i[1] = i[1] * n[0], i[2] = i[2] * n[0], i[3] = i[3] * n[1], i[4] = i[4] * n[1], i[5] = i[5] * n[1], i[6] = i[6] * n[2], i[7] = i[7] * n[2], i[8] = i[8] * n[2], this.center = new m().from(t), this.halfAxes = i, this;
  }
  clone() {
    return new ve(this.center, this.halfAxes);
  }
  equals(t) {
    return this === t || !!t && this.center.equals(t.center) && this.halfAxes.equals(t.halfAxes);
  }
  getBoundingSphere(t = new Oe()) {
    const n = this.halfAxes, s = n.getColumn(0, ze), r = n.getColumn(1, We), i = n.getColumn(2, Xe), o = cf.copy(s).add(r).add(i);
    return t.center.copy(this.center), t.radius = o.magnitude(), t;
  }
  intersectPlane(t) {
    const n = this.center, s = t.normal, r = this.halfAxes, i = s.x, o = s.y, a = s.z, c = Math.abs(i * r[Ft.COLUMN0ROW0] + o * r[Ft.COLUMN0ROW1] + a * r[Ft.COLUMN0ROW2]) + Math.abs(i * r[Ft.COLUMN1ROW0] + o * r[Ft.COLUMN1ROW1] + a * r[Ft.COLUMN1ROW2]) + Math.abs(i * r[Ft.COLUMN2ROW0] + o * r[Ft.COLUMN2ROW1] + a * r[Ft.COLUMN2ROW2]), u = s.dot(n) + t.distance;
    return u <= -c ? ht.OUTSIDE : u >= c ? ht.INSIDE : ht.INTERSECTING;
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceSquaredTo(t));
  }
  distanceSquaredTo(t) {
    const n = uf.from(t).subtract(this.center), s = this.halfAxes, r = s.getColumn(0, ze), i = s.getColumn(1, We), o = s.getColumn(2, Xe), a = r.magnitude(), c = i.magnitude(), u = o.magnitude();
    r.normalize(), i.normalize(), o.normalize();
    let l = 0, h;
    return h = Math.abs(n.dot(r)) - a, h > 0 && (l += h * h), h = Math.abs(n.dot(i)) - c, h > 0 && (l += h * h), h = Math.abs(n.dot(o)) - u, h > 0 && (l += h * h), l;
  }
  computePlaneDistances(t, n, s = [-0, -0]) {
    let r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    const o = this.center, a = this.halfAxes, c = a.getColumn(0, ze), u = a.getColumn(1, We), l = a.getColumn(2, Xe), h = lf.copy(c).add(u).add(l).add(o), f = hf.copy(h).subtract(t);
    let d = n.dot(f);
    return r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).add(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).subtract(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), h.copy(o).add(c).subtract(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).add(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).add(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).subtract(u).add(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), o.copy(h).subtract(c).subtract(u).subtract(l), f.copy(h).subtract(t), d = n.dot(f), r = Math.min(d, r), i = Math.max(d, i), s[0] = r, s[1] = i, s;
  }
  transform(t) {
    this.center.transformAsPoint(t);
    const n = this.halfAxes.getColumn(0, ze);
    n.transformAsPoint(t);
    const s = this.halfAxes.getColumn(1, We);
    s.transformAsPoint(t);
    const r = this.halfAxes.getColumn(2, Xe);
    return r.transformAsPoint(t), this.halfAxes = new K([...n, ...s, ...r]), this;
  }
  getTransform() {
    throw new Error("not implemented");
  }
}
const Jr = new m(), Vr = new m();
class $ {
  constructor(t = [0, 0, 1], n = 0) {
    R(this, "normal", void 0), R(this, "distance", void 0), this.normal = new m(), this.distance = -0, this.fromNormalDistance(t, n);
  }
  fromNormalDistance(t, n) {
    return J(Number.isFinite(n)), this.normal.from(t).normalize(), this.distance = n, this;
  }
  fromPointNormal(t, n) {
    t = Jr.from(t), this.normal.from(n).normalize();
    const s = -this.normal.dot(t);
    return this.distance = s, this;
  }
  fromCoefficients(t, n, s, r) {
    return this.normal.set(t, n, s), J(Ht(this.normal.len(), 1)), this.distance = r, this;
  }
  clone() {
    return new $(this.normal, this.distance);
  }
  equals(t) {
    return Ht(this.distance, t.distance) && Ht(this.normal, t.normal);
  }
  getPointDistance(t) {
    return this.normal.dot(t) + this.distance;
  }
  transform(t) {
    const n = Vr.copy(this.normal).transformAsVector(t).normalize(), s = this.normal.scale(-this.distance).transform(t);
    return this.fromPointNormal(s, n);
  }
  projectPointOntoPlane(t, n = [0, 0, 0]) {
    const s = Jr.from(t), r = this.getPointDistance(s), i = Vr.copy(this.normal).scale(r);
    return s.subtract(i).to(n);
  }
}
const kr = [new m([1, 0, 0]), new m([0, 1, 0]), new m([0, 0, 1])], jr = new m(), ff = new m();
class at {
  constructor(t = []) {
    R(this, "planes", void 0), this.planes = t;
  }
  fromBoundingSphere(t) {
    this.planes.length = 2 * kr.length;
    const n = t.center, s = t.radius;
    let r = 0;
    for (const i of kr) {
      let o = this.planes[r], a = this.planes[r + 1];
      o || (o = this.planes[r] = new $()), a || (a = this.planes[r + 1] = new $());
      const c = jr.copy(i).scale(-s).add(n);
      o.fromPointNormal(c, i);
      const u = jr.copy(i).scale(s).add(n), l = ff.copy(i).negate();
      a.fromPointNormal(u, l), r += 2;
    }
    return this;
  }
  computeVisibility(t) {
    let n = ht.INSIDE;
    for (const s of this.planes)
      switch (t.intersectPlane(s)) {
        case ht.OUTSIDE:
          return ht.OUTSIDE;
        case ht.INTERSECTING:
          n = ht.INTERSECTING;
          break;
      }
    return n;
  }
  computeVisibilityWithPlaneMask(t, n) {
    if (J(Number.isFinite(n), "parentPlaneMask is required."), n === at.MASK_OUTSIDE || n === at.MASK_INSIDE)
      return n;
    let s = at.MASK_INSIDE;
    const r = this.planes;
    for (let i = 0; i < this.planes.length; ++i) {
      const o = i < 31 ? 1 << i : 0;
      if (i < 31 && !(n & o))
        continue;
      const a = r[i], c = t.intersectPlane(a);
      if (c === ht.OUTSIDE)
        return at.MASK_OUTSIDE;
      c === ht.INTERSECTING && (s |= o);
    }
    return s;
  }
}
R(at, "MASK_OUTSIDE", 4294967295);
R(at, "MASK_INSIDE", 0);
R(at, "MASK_INDETERMINATE", 2147483647);
const df = new m(), mf = new m(), Af = new m(), gf = new m(), pf = new m();
class fn {
  constructor(t = {}) {
    R(this, "left", void 0), R(this, "_left", void 0), R(this, "right", void 0), R(this, "_right", void 0), R(this, "top", void 0), R(this, "_top", void 0), R(this, "bottom", void 0), R(this, "_bottom", void 0), R(this, "near", void 0), R(this, "_near", void 0), R(this, "far", void 0), R(this, "_far", void 0), R(this, "_cullingVolume", new at([new $(), new $(), new $(), new $(), new $(), new $()])), R(this, "_perspectiveMatrix", new N()), R(this, "_infinitePerspective", new N());
    const {
      near: n = 1,
      far: s = 5e8
    } = t;
    this.left = t.left, this._left = void 0, this.right = t.right, this._right = void 0, this.top = t.top, this._top = void 0, this.bottom = t.bottom, this._bottom = void 0, this.near = n, this._near = n, this.far = s, this._far = s;
  }
  clone() {
    return new fn({
      right: this.right,
      left: this.left,
      top: this.top,
      bottom: this.bottom,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return t && t instanceof fn && this.right === t.right && this.left === t.left && this.top === t.top && this.bottom === t.bottom && this.near === t.near && this.far === t.far;
  }
  get projectionMatrix() {
    return this._update(), this._perspectiveMatrix;
  }
  get infiniteProjectionMatrix() {
    return this._update(), this._infinitePerspective;
  }
  computeCullingVolume(t, n, s) {
    J(t, "position is required."), J(n, "direction is required."), J(s, "up is required.");
    const r = this._cullingVolume.planes;
    s = df.copy(s).normalize();
    const i = mf.copy(n).cross(s).normalize(), o = Af.copy(n).multiplyByScalar(this.near).add(t), a = gf.copy(n).multiplyByScalar(this.far).add(t);
    let c = pf;
    return c.copy(i).multiplyByScalar(this.left).add(o).subtract(t).cross(s), r[0].fromPointNormal(t, c), c.copy(i).multiplyByScalar(this.right).add(o).subtract(t).cross(s).negate(), r[1].fromPointNormal(t, c), c.copy(s).multiplyByScalar(this.bottom).add(o).subtract(t).cross(i).negate(), r[2].fromPointNormal(t, c), c.copy(s).multiplyByScalar(this.top).add(o).subtract(t).cross(i), r[3].fromPointNormal(t, c), c = new m().copy(n), r[4].fromPointNormal(o, c), c.negate(), r[5].fromPointNormal(a, c), this._cullingVolume;
  }
  getPixelDimensions(t, n, s, r) {
    this._update(), J(Number.isFinite(t) && Number.isFinite(n)), J(t > 0), J(n > 0), J(s > 0), J(r);
    const i = 1 / this.near;
    let o = this.top * i;
    const a = 2 * s * o / n;
    o = this.right * i;
    const c = 2 * s * o / t;
    return r.x = c, r.y = a, r;
  }
  _update() {
    J(Number.isFinite(this.right) && Number.isFinite(this.left) && Number.isFinite(this.top) && Number.isFinite(this.bottom) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const {
      top: t,
      bottom: n,
      right: s,
      left: r,
      near: i,
      far: o
    } = this;
    (t !== this._top || n !== this._bottom || r !== this._left || s !== this._right || i !== this._near || o !== this._far) && (J(this.near > 0 && this.near < this.far, "near must be greater than zero and less than far."), this._left = r, this._right = s, this._top = t, this._bottom = n, this._near = i, this._far = o, this._perspectiveMatrix = new N().frustum({
      left: r,
      right: s,
      bottom: n,
      top: t,
      near: i,
      far: o
    }), this._infinitePerspective = new N().frustum({
      left: r,
      right: s,
      bottom: n,
      top: t,
      near: i,
      far: 1 / 0
    }));
  }
}
const Bf = (e) => e !== null && typeof e < "u";
class dn {
  constructor(t = {}) {
    R(this, "_offCenterFrustum", new fn()), R(this, "fov", void 0), R(this, "_fov", void 0), R(this, "_fovy", void 0), R(this, "_sseDenominator", void 0), R(this, "aspectRatio", void 0), R(this, "_aspectRatio", void 0), R(this, "near", void 0), R(this, "_near", void 0), R(this, "far", void 0), R(this, "_far", void 0), R(this, "xOffset", void 0), R(this, "_xOffset", void 0), R(this, "yOffset", void 0), R(this, "_yOffset", void 0);
    const {
      fov: n,
      aspectRatio: s,
      near: r = 1,
      far: i = 5e8,
      xOffset: o = 0,
      yOffset: a = 0
    } = t;
    this.fov = n, this.aspectRatio = s, this.near = r, this.far = i, this.xOffset = o, this.yOffset = a;
  }
  clone() {
    return new dn({
      aspectRatio: this.aspectRatio,
      fov: this.fov,
      near: this.near,
      far: this.far
    });
  }
  equals(t) {
    return !Bf(t) || !(t instanceof dn) ? !1 : (this._update(), t._update(), this.fov === t.fov && this.aspectRatio === t.aspectRatio && this.near === t.near && this.far === t.far && this._offCenterFrustum.equals(t._offCenterFrustum));
  }
  get projectionMatrix() {
    return this._update(), this._offCenterFrustum.projectionMatrix;
  }
  get infiniteProjectionMatrix() {
    return this._update(), this._offCenterFrustum.infiniteProjectionMatrix;
  }
  get fovy() {
    return this._update(), this._fovy;
  }
  get sseDenominator() {
    return this._update(), this._sseDenominator;
  }
  computeCullingVolume(t, n, s) {
    return this._update(), this._offCenterFrustum.computeCullingVolume(t, n, s);
  }
  getPixelDimensions(t, n, s, r) {
    return this._update(), this._offCenterFrustum.getPixelDimensions(t, n, s, r || new bn());
  }
  _update() {
    J(Number.isFinite(this.fov) && Number.isFinite(this.aspectRatio) && Number.isFinite(this.near) && Number.isFinite(this.far));
    const t = this._offCenterFrustum;
    (this.fov !== this._fov || this.aspectRatio !== this._aspectRatio || this.near !== this._near || this.far !== this._far || this.xOffset !== this._xOffset || this.yOffset !== this._yOffset) && (J(this.fov >= 0 && this.fov < Math.PI), J(this.aspectRatio > 0), J(this.near >= 0 && this.near < this.far), this._aspectRatio = this.aspectRatio, this._fov = this.fov, this._fovy = this.aspectRatio <= 1 ? this.fov : Math.atan(Math.tan(this.fov * 0.5) / this.aspectRatio) * 2, this._near = this.near, this._far = this.far, this._sseDenominator = 2 * Math.tan(0.5 * this._fovy), this._xOffset = this.xOffset, this._yOffset = this.yOffset, t.top = this.near * Math.tan(0.5 * this._fovy), t.bottom = -t.top, t.right = this.aspectRatio * t.top, t.left = -t.right, t.near = this.near, t.far = this.far, t.right += this.xOffset, t.left += this.xOffset, t.top += this.yOffset, t.bottom += this.yOffset);
  }
}
new m();
new m();
new m();
new m();
new m();
new m();
new m();
new m();
new m();
new m();
new m();
new m();
const Mt = new K(), yf = new K(), Cf = new K(), Qe = new K(), Kr = new K();
function Tf(e, t = {}) {
  const n = Hh, s = 10;
  let r = 0, i = 0;
  const o = yf, a = Cf;
  o.identity(), a.copy(e);
  const c = n * Ef(a);
  for (; i < s && bf(a) > c; )
    _f(a, Qe), Kr.copy(Qe).transpose(), a.multiplyRight(Qe), a.multiplyLeft(Kr), o.multiplyRight(Qe), ++r > 2 && (++i, r = 0);
  return t.unitary = o.toTarget(t.unitary), t.diagonal = a.toTarget(t.diagonal), t;
}
function Ef(e) {
  let t = 0;
  for (let n = 0; n < 9; ++n) {
    const s = e[n];
    t += s * s;
  }
  return Math.sqrt(t);
}
const gs = [1, 0, 0], ps = [2, 2, 1];
function bf(e) {
  let t = 0;
  for (let n = 0; n < 3; ++n) {
    const s = e[Mt.getElementIndex(ps[n], gs[n])];
    t += 2 * s * s;
  }
  return Math.sqrt(t);
}
function _f(e, t) {
  const n = Lo;
  let s = 0, r = 1;
  for (let u = 0; u < 3; ++u) {
    const l = Math.abs(e[Mt.getElementIndex(ps[u], gs[u])]);
    l > s && (r = u, s = l);
  }
  const i = gs[r], o = ps[r];
  let a = 1, c = 0;
  if (Math.abs(e[Mt.getElementIndex(o, i)]) > n) {
    const u = e[Mt.getElementIndex(o, o)], l = e[Mt.getElementIndex(i, i)], h = e[Mt.getElementIndex(o, i)], f = (u - l) / 2 / h;
    let d;
    f < 0 ? d = -1 / (-f + Math.sqrt(1 + f * f)) : d = 1 / (f + Math.sqrt(1 + f * f)), a = 1 / Math.sqrt(1 + d * d), c = d * a;
  }
  return K.IDENTITY.to(t), t[Mt.getElementIndex(i, i)] = t[Mt.getElementIndex(o, o)] = a, t[Mt.getElementIndex(o, i)] = c, t[Mt.getElementIndex(i, o)] = -c, t;
}
const Pt = new m(), wf = new m(), Mf = new m(), Rf = new m(), If = new m(), Sf = new K(), Df = {
  diagonal: new K(),
  unitary: new K()
};
function Ff(e, t = new ve()) {
  if (!e || e.length === 0)
    return t.halfAxes = new K([0, 0, 0, 0, 0, 0, 0, 0, 0]), t.center = new m(), t;
  const n = e.length, s = new m(0, 0, 0);
  for (const I of e)
    s.add(I);
  const r = 1 / n;
  s.multiplyByScalar(r);
  let i = 0, o = 0, a = 0, c = 0, u = 0, l = 0;
  for (const I of e) {
    const S = Pt.copy(I).subtract(s);
    i += S.x * S.x, o += S.x * S.y, a += S.x * S.z, c += S.y * S.y, u += S.y * S.z, l += S.z * S.z;
  }
  i *= r, o *= r, a *= r, c *= r, u *= r, l *= r;
  const h = Sf;
  h[0] = i, h[1] = o, h[2] = a, h[3] = o, h[4] = c, h[5] = u, h[6] = a, h[7] = u, h[8] = l;
  const {
    unitary: f
  } = Tf(h, Df), d = t.halfAxes.copy(f);
  let A = d.getColumn(0, Mf), g = d.getColumn(1, Rf), p = d.getColumn(2, If), y = -Number.MAX_VALUE, _ = -Number.MAX_VALUE, b = -Number.MAX_VALUE, w = Number.MAX_VALUE, M = Number.MAX_VALUE, C = Number.MAX_VALUE;
  for (const I of e)
    Pt.copy(I), y = Math.max(Pt.dot(A), y), _ = Math.max(Pt.dot(g), _), b = Math.max(Pt.dot(p), b), w = Math.min(Pt.dot(A), w), M = Math.min(Pt.dot(g), M), C = Math.min(Pt.dot(p), C);
  A = A.multiplyByScalar(0.5 * (w + y)), g = g.multiplyByScalar(0.5 * (M + _)), p = p.multiplyByScalar(0.5 * (C + b)), t.center.copy(A).add(g).add(p);
  const D = wf.set(y - w, _ - M, b - C).multiplyByScalar(0.5), F = new K([D[0], 0, 0, 0, D[1], 0, 0, 0, D[2]]);
  return t.halfAxes.multiplyRight(F), t;
}
const zr = new m(), kn = new m(), Bs = new at([new $(), new $(), new $(), new $(), new $(), new $()]);
function Of(e, t) {
  const {
    cameraDirection: n,
    cameraUp: s,
    height: r
  } = e, {
    metersPerUnit: i
  } = e.distanceScales, o = rn(e, e.center), a = H.WGS84.eastNorthUpToFixedFrame(o), c = e.unprojectPosition(e.cameraPosition), u = H.WGS84.cartographicToCartesian(c, new m()), l = new m(a.transformAsVector(new m(n).scale(i))).normalize(), h = new m(a.transformAsVector(new m(s).scale(i))).normalize();
  xf(e);
  const f = e.constructor, {
    longitude: d,
    latitude: A,
    width: g,
    bearing: p,
    zoom: y
  } = e, _ = new f({
    longitude: d,
    latitude: A,
    height: r,
    width: g,
    bearing: p,
    zoom: y,
    pitch: 0
  });
  return {
    camera: {
      position: u,
      direction: l,
      up: h
    },
    viewport: e,
    topDownViewport: _,
    height: r,
    cullingVolume: Bs,
    frameNumber: t,
    sseDenominator: 1.15
  };
}
function vf(e, t, n) {
  if (n === 0 || e.length <= n)
    return [e, []];
  const s = [], {
    longitude: r,
    latitude: i
  } = t.viewport;
  for (const [u, l] of e.entries()) {
    const [h, f] = l.header.mbs, d = Math.abs(r - h), A = Math.abs(i - f), g = Math.sqrt(A * A + d * d);
    s.push([u, g]);
  }
  const o = s.sort((u, l) => u[1] - l[1]), a = [];
  for (let u = 0; u < n; u++)
    a.push(e[o[u][0]]);
  const c = [];
  for (let u = n; u < o.length; u++)
    c.push(e[o[u][0]]);
  return [a, c];
}
function xf(e) {
  const t = e.getFrustumPlanes(), n = Wr(t.near, e.cameraPosition), s = rn(e, n), r = rn(e, e.cameraPosition, kn);
  let i = 0;
  Bs.planes[i++].fromPointNormal(s, zr.copy(s).subtract(r));
  for (const o in t) {
    if (o === "near")
      continue;
    const a = t[o], c = Wr(a, n, kn), u = rn(e, c, kn);
    Bs.planes[i++].fromPointNormal(u, zr.copy(s).subtract(u));
  }
}
function Wr(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new m();
  const s = e.normal.dot(t);
  return n.copy(e.normal).scale(e.distance - s).add(t), n;
}
function rn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : new m();
  const s = e.unprojectPosition(t);
  return H.WGS84.cartographicToCartesian(s, n);
}
const Lf = 6378137, Gf = 6378137, ys = 6356752314245179e-9, ie = new m();
function Uf(e, t) {
  if (e instanceof ve) {
    const {
      halfAxes: n
    } = e, s = Nf(n);
    return Math.log2(ys / (s + t[2]));
  } else if (e instanceof Oe) {
    const {
      radius: n
    } = e;
    return Math.log2(ys / (n + t[2]));
  } else if (e.width && e.height) {
    const {
      width: n,
      height: s
    } = e, r = Math.log2(Lf / n), i = Math.log2(Gf / s);
    return (r + i) / 2;
  }
  return 1;
}
function Go(e, t, n) {
  H.WGS84.cartographicToCartesian([e.xmax, e.ymax, e.zmax], ie);
  const s = Math.sqrt(Math.pow(ie[0] - n[0], 2) + Math.pow(ie[1] - n[1], 2) + Math.pow(ie[2] - n[2], 2));
  return Math.log2(ys / (s + t[2]));
}
function Pf(e, t, n) {
  const [s, r, i, o] = e;
  return Go({
    xmin: s,
    xmax: i,
    ymin: r,
    ymax: o,
    zmin: 0,
    zmax: 0
  }, t, n);
}
function Nf(e) {
  e.getColumn(0, ie);
  const t = e.getColumn(1), n = e.getColumn(2);
  return ie.add(t).add(n).len();
}
const it = {
  UNLOADED: 0,
  LOADING: 1,
  PROCESSING: 2,
  READY: 3,
  EXPIRED: 4,
  FAILED: 5
};
let xt = function(e) {
  return e[e.ADD = 1] = "ADD", e[e.REPLACE = 2] = "REPLACE", e;
}({}), jt = function(e) {
  return e.EMPTY = "empty", e.SCENEGRAPH = "scenegraph", e.POINTCLOUD = "pointcloud", e.MESH = "mesh", e;
}({}), dt = function(e) {
  return e.I3S = "I3S", e.TILES3D = "TILES3D", e;
}({}), wn = function(e) {
  return e.GEOMETRIC_ERROR = "geometricError", e.MAX_SCREEN_THRESHOLD = "maxScreenThreshold", e;
}({});
const Hf = {
  NOT_COMPUTED: -1,
  USE_OPTIMIZATION: 1,
  SKIP_OPTIMIZATION: 0
};
function Uo(e) {
  return e != null;
}
const Z = new m(), on = new m(), Jf = new m(), Vf = new m(), Vt = new m(), Xr = new m(), Qr = new m(), qr = new m();
function jn(e, t, n) {
  if (U(e, "3D Tile: boundingVolume must be defined"), e.box)
    return Po(e.box, t, n);
  if (e.region)
    return Kf(e.region);
  if (e.sphere)
    return jf(e.sphere, t, n);
  throw new Error("3D Tile: boundingVolume must contain a sphere, region, or box");
}
function kf(e, t) {
  if (e.box)
    return zf(t);
  if (e.region) {
    const [n, s, r, i, o, a] = e.region;
    return [[Et(n), Et(s), o], [Et(r), Et(i), a]];
  }
  if (e.sphere)
    return Wf(t);
  throw new Error("Unkown boundingVolume type");
}
function Po(e, t, n) {
  const s = new m(e[0], e[1], e[2]);
  t.transform(s, s);
  let r = [];
  if (e.length === 10) {
    const u = e.slice(3, 6), l = new hn();
    l.fromArray(e, 6);
    const h = new m([1, 0, 0]), f = new m([0, 1, 0]), d = new m([0, 0, 1]);
    h.transformByQuaternion(l), h.scale(u[0]), f.transformByQuaternion(l), f.scale(u[1]), d.transformByQuaternion(l), d.scale(u[2]), r = [...h.toArray(), ...f.toArray(), ...d.toArray()];
  } else
    r = [...e.slice(3, 6), ...e.slice(6, 9), ...e.slice(9, 12)];
  const i = t.transformAsVector(r.slice(0, 3)), o = t.transformAsVector(r.slice(3, 6)), a = t.transformAsVector(r.slice(6, 9)), c = new K([i[0], i[1], i[2], o[0], o[1], o[2], a[0], a[1], a[2]]);
  return Uo(n) ? (n.center = s, n.halfAxes = c, n) : new ve(s, c);
}
function jf(e, t, n) {
  const s = new m(e[0], e[1], e[2]);
  t.transform(s, s);
  const r = t.getScale(on), i = Math.max(Math.max(r[0], r[1]), r[2]), o = e[3] * i;
  return Uo(n) ? (n.center = s, n.radius = o, n) : new Oe(s, o);
}
function Kf(e) {
  const [t, n, s, r, i, o] = e, a = H.WGS84.cartographicToCartesian([Et(t), Et(r), i], Jf), c = H.WGS84.cartographicToCartesian([Et(s), Et(n), o], Vf), u = new m().addVectors(a, c).multiplyByScalar(0.5);
  return H.WGS84.cartesianToCartographic(u, Vt), H.WGS84.cartographicToCartesian([Et(s), Vt[1], Vt[2]], Xr), H.WGS84.cartographicToCartesian([Vt[0], Et(r), Vt[2]], Qr), H.WGS84.cartographicToCartesian([Vt[0], Vt[1], o], qr), Po([...u, ...Xr.subtract(u), ...Qr.subtract(u), ...qr.subtract(u)], new N());
}
function zf(e) {
  const t = No(), {
    halfAxes: n
  } = e, s = new m(n.getColumn(0)), r = new m(n.getColumn(1)), i = new m(n.getColumn(2));
  for (let o = 0; o < 2; o++) {
    for (let a = 0; a < 2; a++) {
      for (let c = 0; c < 2; c++)
        Z.copy(e.center), Z.add(s), Z.add(r), Z.add(i), Ho(t, Z), i.negate();
      r.negate();
    }
    s.negate();
  }
  return t;
}
function Wf(e) {
  const t = No(), {
    center: n,
    radius: s
  } = e, r = H.WGS84.scaleToGeodeticSurface(n, Z);
  let i;
  r ? i = H.WGS84.geodeticSurfaceNormal(r) : i = new m(0, 0, 1);
  let o = new m(i[2], -i[1], 0);
  o.len() > 0 ? o.normalize() : o = new m(0, 1, 0);
  const a = o.clone().cross(i);
  for (const c of [o, a, i]) {
    on.copy(c).scale(s);
    for (let u = 0; u < 2; u++)
      Z.copy(n), Z.add(on), Ho(t, Z), on.negate();
  }
  return t;
}
function No() {
  return [[1 / 0, 1 / 0, 1 / 0], [-1 / 0, -1 / 0, -1 / 0]];
}
function Ho(e, t) {
  H.WGS84.cartesianToCartographic(t, Z), e[0][0] = Math.min(e[0][0], Z[0]), e[0][1] = Math.min(e[0][1], Z[1]), e[0][2] = Math.min(e[0][2], Z[2]), e[1][0] = Math.max(e[1][0], Z[0]), e[1][1] = Math.max(e[1][1], Z[1]), e[1][2] = Math.max(e[1][2], Z[2]);
}
new m();
new m();
new N();
new m();
new m();
new m();
function Xf(e, t) {
  const n = e * t;
  return 1 - Math.exp(-(n * n));
}
function Qf(e, t) {
  if (e.dynamicScreenSpaceError && e.dynamicScreenSpaceErrorComputedDensity) {
    const n = e.dynamicScreenSpaceErrorComputedDensity, s = e.dynamicScreenSpaceErrorFactor;
    return Xf(t, n) * s;
  }
  return 0;
}
function qf(e, t, n) {
  const s = e.tileset, r = e.parent && e.parent.lodMetricValue || e.lodMetricValue, i = n ? r : e.lodMetricValue;
  if (i === 0)
    return 0;
  const o = Math.max(e._distanceToCamera, 1e-7), {
    height: a,
    sseDenominator: c
  } = t, {
    viewDistanceScale: u
  } = s.options;
  let l = i * a * (u || 1) / (o * c);
  return l -= Qf(s, o), l;
}
const Kn = new m(), Yr = new m(), Nt = new m(), $r = new m(), Yf = new m(), zn = new N(), Zr = new N();
function $f(e, t) {
  if (e.lodMetricValue === 0 || isNaN(e.lodMetricValue))
    return "DIG";
  const n = 2 * Jo(e, t);
  return n < 2 ? "OUT" : !e.header.children || n <= e.lodMetricValue ? "DRAW" : e.header.children ? "DIG" : "OUT";
}
function Jo(e, t) {
  const {
    topDownViewport: n
  } = t, s = e.header.mbs[1], r = e.header.mbs[0], i = e.header.mbs[2], o = e.header.mbs[3], a = [...e.boundingVolume.center], c = n.unprojectPosition(n.cameraPosition);
  H.WGS84.cartographicToCartesian(c, Kn), Yr.copy(Kn).subtract(a).normalize(), H.WGS84.eastNorthUpToFixedFrame(a, zn), Zr.copy(zn).invert(), Nt.copy(Kn).transform(Zr);
  const u = Math.sqrt(Nt[0] * Nt[0] + Nt[1] * Nt[1]), l = u * u / Nt[2];
  $r.copy([Nt[0], Nt[1], l]);
  const f = $r.transform(zn).subtract(a).normalize(), A = Yr.cross(f).normalize().scale(o).add(a), g = H.WGS84.cartesianToCartographic(A), p = n.project([r, s, i]), y = n.project(g);
  return Yf.copy(p).subtract(y).magnitude();
}
function Zf(e) {
  return {
    assetGltfUpAxis: e.asset && e.asset.gltfUpAxis || "Y"
  };
}
class ti {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    this._map = /* @__PURE__ */ new Map(), this._array = void 0, this._length = void 0, this._array = new Array(t), this._length = t;
  }
  get length() {
    return this._length;
  }
  set length(t) {
    this._length = t, t > this._array.length && (this._array.length = t);
  }
  get values() {
    return this._array;
  }
  get(t) {
    return U(t < this._array.length), this._array[t];
  }
  set(t, n) {
    U(t >= 0), t >= this.length && (this.length = t + 1), this._map.has(this._array[t]) && this._map.delete(this._array[t]), this._array[t] = n, this._map.set(n, t);
  }
  delete(t) {
    const n = this._map.get(t);
    n >= 0 && (this._array.splice(n, 1), this._map.delete(t), this.length--);
  }
  peek() {
    return this._array[this._length - 1];
  }
  push(t) {
    if (!this._map.has(t)) {
      const n = this.length++;
      this._array[n] = t, this._map.set(t, n);
    }
  }
  pop() {
    const t = this._array[--this.length];
    return this._map.delete(t), t;
  }
  reserve(t) {
    U(t >= 0), t > this._array.length && (this._array.length = t);
  }
  resize(t) {
    U(t >= 0), this.length = t;
  }
  trim(t) {
    t == null && (t = this.length), this._array.length = t;
  }
  reset() {
    this._array = [], this._map = /* @__PURE__ */ new Map(), this._length = 0;
  }
  find(t) {
    return this._map.has(t);
  }
}
const td = {
  loadSiblings: !1,
  skipLevelOfDetail: !1,
  updateTransforms: !0,
  onTraversalEnd: () => {
  },
  viewportTraversersMap: {},
  basePath: ""
};
class Mn {
  traversalFinished(t) {
    return !0;
  }
  constructor(t) {
    this.options = void 0, this.root = null, this.selectedTiles = {}, this.requestedTiles = {}, this.emptyTiles = {}, this.lastUpdate = (/* @__PURE__ */ new Date()).getTime(), this.updateDebounceTime = 1e3, this._traversalStack = new ti(), this._emptyTraversalStack = new ti(), this._frameNumber = null, this.options = {
      ...td,
      ...t
    };
  }
  traverse(t, n, s) {
    this.root = t, this.options = {
      ...this.options,
      ...s
    }, this.reset(), this.updateTile(t, n), this._frameNumber = n.frameNumber, this.executeTraversal(t, n);
  }
  reset() {
    this.requestedTiles = {}, this.selectedTiles = {}, this.emptyTiles = {}, this._traversalStack.reset(), this._emptyTraversalStack.reset();
  }
  executeTraversal(t, n) {
    const s = this._traversalStack;
    for (t._selectionDepth = 1, s.push(t); s.length > 0; ) {
      const i = s.pop();
      let o = !1;
      this.canTraverse(i, n) && (this.updateChildTiles(i, n), o = this.updateAndPushChildren(i, n, s, i.hasRenderContent ? i._selectionDepth + 1 : i._selectionDepth));
      const a = i.parent, c = !!(!a || a._shouldRefine), u = !o;
      i.hasRenderContent ? i.refine === xt.ADD ? (this.loadTile(i, n), this.selectTile(i, n)) : i.refine === xt.REPLACE && (this.loadTile(i, n), u && this.selectTile(i, n)) : (this.emptyTiles[i.id] = i, this.loadTile(i, n), u && this.selectTile(i, n)), this.touchTile(i, n), i._shouldRefine = o && c;
    }
    const r = (/* @__PURE__ */ new Date()).getTime();
    (this.traversalFinished(n) || r - this.lastUpdate > this.updateDebounceTime) && (this.lastUpdate = r, this.options.onTraversalEnd(n));
  }
  updateChildTiles(t, n) {
    const s = t.children;
    for (const r of s)
      this.updateTile(r, n);
  }
  updateAndPushChildren(t, n, s, r) {
    const {
      loadSiblings: i,
      skipLevelOfDetail: o
    } = this.options, a = t.children;
    a.sort(this.compareDistanceToCamera.bind(this));
    const c = t.refine === xt.REPLACE && t.hasRenderContent && !o;
    let u = !1, l = !0;
    for (const h of a)
      if (h._selectionDepth = r, h.isVisibleAndInRequestVolume ? (s.find(h) && s.delete(h), s.push(h), u = !0) : (c || i) && (this.loadTile(h, n), this.touchTile(h, n)), c) {
        let f;
        if (h._inRequestVolume ? h.hasRenderContent ? f = h.contentAvailable : f = this.executeEmptyTraversal(h, n) : f = !1, l = l && f, !l)
          return !1;
      }
    return u || (l = !1), l;
  }
  updateTile(t, n) {
    this.updateTileVisibility(t, n);
  }
  selectTile(t, n) {
    this.shouldSelectTile(t) && (t._selectedFrame = n.frameNumber, this.selectedTiles[t.id] = t);
  }
  loadTile(t, n) {
    this.shouldLoadTile(t) && (t._requestedFrame = n.frameNumber, t._priority = t._getPriority(), this.requestedTiles[t.id] = t);
  }
  touchTile(t, n) {
    t.tileset._cache.touch(t), t._touchedFrame = n.frameNumber;
  }
  canTraverse(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
    return t.hasChildren ? t.hasTilesetContent ? !t.contentExpired : !r && !t.isVisibleAndInRequestVolume ? !1 : this.shouldRefine(t, n, s) : !1;
  }
  shouldLoadTile(t) {
    return t.hasUnloadedContent || t.contentExpired;
  }
  shouldSelectTile(t) {
    return t.contentAvailable && !this.options.skipLevelOfDetail;
  }
  shouldRefine(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = t._screenSpaceError;
    return s && (r = t.getScreenSpaceError(n, !0)), r > t.tileset.memoryAdjustedScreenSpaceError;
  }
  updateTileVisibility(t, n) {
    const s = [];
    if (this.options.viewportTraversersMap)
      for (const r in this.options.viewportTraversersMap)
        this.options.viewportTraversersMap[r] === n.viewport.id && s.push(r);
    else
      s.push(n.viewport.id);
    t.updateVisibility(n, s);
  }
  compareDistanceToCamera(t, n) {
    return t._distanceToCamera - n._distanceToCamera;
  }
  anyChildrenVisible(t, n) {
    let s = !1;
    for (const r of t.children)
      r.updateVisibility(n), s = s || r.isVisibleAndInRequestVolume;
    return s;
  }
  executeEmptyTraversal(t, n) {
    let s = !0;
    const r = this._emptyTraversalStack;
    for (r.push(t); r.length > 0; ) {
      const i = r.pop(), o = !i.hasRenderContent && this.canTraverse(i, n, !1, !1), a = !i.hasRenderContent && i.children.length === 0;
      if (!o && !i.contentAvailable && !a && (s = !1), this.updateTile(i, n), i.isVisibleAndInRequestVolume || (this.loadTile(i, n), this.touchTile(i, n)), o) {
        const c = i.children;
        for (const u of c)
          r.push(u);
      }
    }
    return s;
  }
}
const ei = new m();
function ed(e) {
  return e != null;
}
class Cs {
  constructor(t, n, s) {
    let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "";
    this.tileset = void 0, this.header = void 0, this.id = void 0, this.url = void 0, this.parent = void 0, this.refine = void 0, this.type = void 0, this.contentUrl = void 0, this.lodMetricType = "geometricError", this.lodMetricValue = 0, this.boundingVolume = null, this.content = null, this.contentState = it.UNLOADED, this.gpuMemoryUsageInBytes = 0, this.children = [], this.depth = 0, this.viewportIds = [], this.transform = new N(), this.extensions = null, this.implicitTiling = null, this.userData = {}, this.computedTransform = void 0, this.hasEmptyContent = !1, this.hasTilesetContent = !1, this.traverser = new Mn({}), this._cacheNode = null, this._frameNumber = null, this._expireDate = null, this._expiredContent = null, this._boundingBox = void 0, this._distanceToCamera = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = void 0, this._visible = void 0, this._contentBoundingVolume = void 0, this._viewerRequestVolume = void 0, this._initialTransform = new N(), this._priority = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._selectionDepth = 0, this._touchedFrame = 0, this._centerZDepth = 0, this._shouldRefine = !1, this._stackLength = 0, this._visitedFrame = 0, this._inRequestVolume = !1, this._lodJudge = null, this.header = n, this.tileset = t, this.id = r || n.id, this.url = n.url, this.parent = s, this.refine = this._getRefine(n.refine), this.type = n.type, this.contentUrl = n.contentUrl, this._initializeLodMetric(n), this._initializeTransforms(n), this._initializeBoundingVolumes(n), this._initializeContent(n), this._initializeRenderingState(n), Object.seal(this);
  }
  destroy() {
    this.header = null;
  }
  isDestroyed() {
    return this.header === null;
  }
  get selected() {
    return this._selectedFrame === this.tileset._frameNumber;
  }
  get isVisible() {
    return this._visible;
  }
  get isVisibleAndInRequestVolume() {
    return this._visible && this._inRequestVolume;
  }
  get hasRenderContent() {
    return !this.hasEmptyContent && !this.hasTilesetContent;
  }
  get hasChildren() {
    return this.children.length > 0 || this.header.children && this.header.children.length > 0;
  }
  get contentReady() {
    return this.contentState === it.READY || this.hasEmptyContent;
  }
  get contentAvailable() {
    return !!(this.contentReady && this.hasRenderContent || this._expiredContent && !this.contentFailed);
  }
  get hasUnloadedContent() {
    return this.hasRenderContent && this.contentUnloaded;
  }
  get contentUnloaded() {
    return this.contentState === it.UNLOADED;
  }
  get contentExpired() {
    return this.contentState === it.EXPIRED;
  }
  get contentFailed() {
    return this.contentState === it.FAILED;
  }
  get distanceToCamera() {
    return this._distanceToCamera;
  }
  get screenSpaceError() {
    return this._screenSpaceError;
  }
  get boundingBox() {
    return this._boundingBox || (this._boundingBox = kf(this.header.boundingVolume, this.boundingVolume)), this._boundingBox;
  }
  getScreenSpaceError(t, n) {
    switch (this.tileset.type) {
      case dt.I3S:
        return Jo(this, t);
      case dt.TILES3D:
        return qf(this, t, n);
      default:
        throw new Error("Unsupported tileset type");
    }
  }
  unselect() {
    this._selectedFrame = 0;
  }
  _getGpuMemoryUsageInBytes() {
    return this.content.gpuMemoryUsageInBytes || this.content.byteLength || 0;
  }
  _getPriority() {
    const t = this.tileset._traverser, {
      skipLevelOfDetail: n
    } = t.options, s = this.refine === xt.ADD || n;
    if (s && !this.isVisible && this._visible !== void 0 || this.tileset._frameNumber - this._touchedFrame >= 1 || this.contentState === it.UNLOADED)
      return -1;
    const r = this.parent, o = r && (!s || this._screenSpaceError === 0 || r.hasTilesetContent) ? r._screenSpaceError : this._screenSpaceError, a = t.root ? t.root._screenSpaceError : 0;
    return Math.max(a - o, 0);
  }
  async loadContent() {
    if (this.hasEmptyContent)
      return !1;
    if (this.content)
      return !0;
    this.contentExpired && (this._expireDate = null), this.contentState = it.LOADING;
    const n = await this.tileset._requestScheduler.scheduleRequest(this.id, this._getPriority.bind(this));
    if (!n)
      return this.contentState = it.UNLOADED, !1;
    try {
      const s = this.tileset.getTileUrl(this.contentUrl), r = this.tileset.loader, i = {
        ...this.tileset.loadOptions,
        [r.id]: {
          ...this.tileset.loadOptions[r.id],
          isTileset: this.type === "json",
          ...this._getLoaderSpecificOptions(r.id)
        }
      };
      return this.content = await Fe(s, r, i), this.tileset.options.contentLoader && await this.tileset.options.contentLoader(this), this._isTileset() && this.tileset._initializeTileHeaders(this.content, this), this.contentState = it.READY, this._onContentLoaded(), !0;
    } catch (s) {
      throw this.contentState = it.FAILED, s;
    } finally {
      n.done();
    }
  }
  unloadContent() {
    return this.content && this.content.destroy && this.content.destroy(), this.content = null, this.header.content && this.header.content.destroy && this.header.content.destroy(), this.header.content = null, this.contentState = it.UNLOADED, !0;
  }
  updateVisibility(t, n) {
    if (this._frameNumber === t.frameNumber)
      return;
    const s = this.parent, r = s ? s._visibilityPlaneMask : at.MASK_INDETERMINATE;
    if (this.tileset._traverser.options.updateTransforms) {
      const i = s ? s.computedTransform : this.tileset.modelMatrix;
      this._updateTransform(i);
    }
    this._distanceToCamera = this.distanceToTile(t), this._screenSpaceError = this.getScreenSpaceError(t, !1), this._visibilityPlaneMask = this.visibility(t, r), this._visible = this._visibilityPlaneMask !== at.MASK_OUTSIDE, this._inRequestVolume = this.insideViewerRequestVolume(t), this._frameNumber = t.frameNumber, this.viewportIds = n;
  }
  visibility(t, n) {
    const {
      cullingVolume: s
    } = t, {
      boundingVolume: r
    } = this;
    return s.computeVisibilityWithPlaneMask(r, n);
  }
  contentVisibility() {
    return !0;
  }
  distanceToTile(t) {
    const n = this.boundingVolume;
    return Math.sqrt(Math.max(n.distanceSquaredTo(t.camera.position), 0));
  }
  cameraSpaceZDepth(t) {
    let {
      camera: n
    } = t;
    const s = this.boundingVolume;
    return ei.subVectors(s.center, n.position), n.direction.dot(ei);
  }
  insideViewerRequestVolume(t) {
    const n = this._viewerRequestVolume;
    return !n || n.distanceSquaredTo(t.camera.position) <= 0;
  }
  updateExpiration() {
    if (ed(this._expireDate) && this.contentReady && !this.hasEmptyContent) {
      const t = Date.now();
      Date.lessThan(this._expireDate, t) && (this.contentState = it.EXPIRED, this._expiredContent = this.content);
    }
  }
  get extras() {
    return this.header.extras;
  }
  _initializeLodMetric(t) {
    "lodMetricType" in t ? this.lodMetricType = t.lodMetricType : (this.lodMetricType = this.parent && this.parent.lodMetricType || this.tileset.lodMetricType, console.warn("3D Tile: Required prop lodMetricType is undefined. Using parent lodMetricType")), "lodMetricValue" in t ? this.lodMetricValue = t.lodMetricValue : (this.lodMetricValue = this.parent && this.parent.lodMetricValue || this.tileset.lodMetricValue, console.warn("3D Tile: Required prop lodMetricValue is undefined. Using parent lodMetricValue"));
  }
  _initializeTransforms(t) {
    this.transform = t.transform ? new N(t.transform) : new N();
    const n = this.parent, s = this.tileset, r = n && n.computedTransform ? n.computedTransform.clone() : s.modelMatrix.clone();
    this.computedTransform = new N(r).multiplyRight(this.transform);
    const i = n && n._initialTransform ? n._initialTransform.clone() : new N();
    this._initialTransform = new N(i).multiplyRight(this.transform);
  }
  _initializeBoundingVolumes(t) {
    this._contentBoundingVolume = null, this._viewerRequestVolume = null, this._updateBoundingVolume(t);
  }
  _initializeContent(t) {
    this.content = {
      _tileset: this.tileset,
      _tile: this
    }, this.hasEmptyContent = !0, this.contentState = it.UNLOADED, this.hasTilesetContent = !1, t.contentUrl && (this.content = null, this.hasEmptyContent = !1);
  }
  _initializeRenderingState(t) {
    this.depth = t.level || (this.parent ? this.parent.depth + 1 : 0), this._shouldRefine = !1, this._distanceToCamera = 0, this._centerZDepth = 0, this._screenSpaceError = 0, this._visibilityPlaneMask = at.MASK_INDETERMINATE, this._visible = void 0, this._inRequestVolume = !1, this._stackLength = 0, this._selectionDepth = 0, this._frameNumber = 0, this._touchedFrame = 0, this._visitedFrame = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._priority = 0;
  }
  _getRefine(t) {
    return t || this.parent && this.parent.refine || xt.REPLACE;
  }
  _isTileset() {
    return this.contentUrl.indexOf(".json") !== -1;
  }
  _onContentLoaded() {
    switch (this.content && this.content.type) {
      case "vctr":
      case "geom":
        this.tileset._traverser.disableSkipLevelOfDetail = !0;
        break;
    }
    this._isTileset() ? this.hasTilesetContent = !0 : this.gpuMemoryUsageInBytes = this._getGpuMemoryUsageInBytes();
  }
  _updateBoundingVolume(t) {
    this.boundingVolume = jn(t.boundingVolume, this.computedTransform, this.boundingVolume);
    const n = t.content;
    n && (n.boundingVolume && (this._contentBoundingVolume = jn(n.boundingVolume, this.computedTransform, this._contentBoundingVolume)), t.viewerRequestVolume && (this._viewerRequestVolume = jn(t.viewerRequestVolume, this.computedTransform, this._viewerRequestVolume)));
  }
  _updateTransform() {
    const n = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : new N()).clone().multiplyRight(this.transform);
    n.equals(this.computedTransform) || (this.computedTransform = n, this._updateBoundingVolume(this.header));
  }
  _getLoaderSpecificOptions(t) {
    switch (t) {
      case "i3s":
        return {
          ...this.tileset.options.i3s,
          _tileOptions: {
            attributeUrls: this.header.attributeUrls,
            textureUrl: this.header.textureUrl,
            textureFormat: this.header.textureFormat,
            textureLoaderOptions: this.header.textureLoaderOptions,
            materialDefinition: this.header.materialDefinition,
            isDracoGeometry: this.header.isDracoGeometry,
            mbs: this.header.mbs
          },
          _tilesetOptions: {
            store: this.tileset.tileset.store,
            attributeStorageInfo: this.tileset.tileset.attributeStorageInfo,
            fields: this.tileset.tileset.fields
          },
          isTileHeader: !1
        };
      case "3d-tiles":
      case "cesium-ion":
      default:
        return Zf(this.tileset.tileset);
    }
  }
}
class nd extends Mn {
  compareDistanceToCamera(t, n) {
    return n._distanceToCamera === 0 && t._distanceToCamera === 0 ? n._centerZDepth - t._centerZDepth : n._distanceToCamera - t._distanceToCamera;
  }
  updateTileVisibility(t, n) {
    if (super.updateTileVisibility(t, n), !t.isVisibleAndInRequestVolume)
      return;
    const s = t.children.length > 0;
    if (t.hasTilesetContent && s) {
      const o = t.children[0];
      this.updateTileVisibility(o, n), t._visible = o._visible;
      return;
    }
    if (this.meetsScreenSpaceErrorEarly(t, n)) {
      t._visible = !1;
      return;
    }
    const r = t.refine === xt.REPLACE, i = t._optimChildrenWithinParent === Hf.USE_OPTIMIZATION;
    if (r && i && s && !this.anyChildrenVisible(t, n)) {
      t._visible = !1;
      return;
    }
  }
  meetsScreenSpaceErrorEarly(t, n) {
    const {
      parent: s
    } = t;
    return !s || s.hasTilesetContent || s.refine !== xt.ADD ? !1 : !this.shouldRefine(t, n, !0);
  }
}
class sd {
  constructor() {
    this.frameNumberMap = /* @__PURE__ */ new Map();
  }
  register(t, n) {
    const s = this.frameNumberMap.get(t) || /* @__PURE__ */ new Map(), r = s.get(n) || 0;
    s.set(n, r + 1), this.frameNumberMap.set(t, s);
  }
  deregister(t, n) {
    const s = this.frameNumberMap.get(t);
    if (!s)
      return;
    const r = s.get(n) || 1;
    s.set(n, r - 1);
  }
  isZero(t, n) {
    var s;
    return (((s = this.frameNumberMap.get(t)) === null || s === void 0 ? void 0 : s.get(n)) || 0) === 0;
  }
}
const Wn = {
  REQUESTED: "REQUESTED",
  COMPLETED: "COMPLETED",
  ERROR: "ERROR"
};
class rd {
  constructor() {
    this._statusMap = void 0, this.pendingTilesRegister = new sd(), this._statusMap = {};
  }
  add(t, n, s, r) {
    if (!this._statusMap[n]) {
      const {
        frameNumber: i,
        viewport: {
          id: o
        }
      } = r;
      this._statusMap[n] = {
        request: t,
        callback: s,
        key: n,
        frameState: r,
        status: Wn.REQUESTED
      }, this.pendingTilesRegister.register(o, i), t().then((a) => {
        this._statusMap[n].status = Wn.COMPLETED;
        const {
          frameNumber: c,
          viewport: {
            id: u
          }
        } = this._statusMap[n].frameState;
        this.pendingTilesRegister.deregister(u, c), this._statusMap[n].callback(a, r);
      }).catch((a) => {
        this._statusMap[n].status = Wn.ERROR;
        const {
          frameNumber: c,
          viewport: {
            id: u
          }
        } = this._statusMap[n].frameState;
        this.pendingTilesRegister.deregister(u, c), s(a);
      });
    }
  }
  update(t, n) {
    if (this._statusMap[t]) {
      const {
        frameNumber: s,
        viewport: {
          id: r
        }
      } = this._statusMap[t].frameState;
      this.pendingTilesRegister.deregister(r, s);
      const {
        frameNumber: i,
        viewport: {
          id: o
        }
      } = n;
      this.pendingTilesRegister.register(o, i), this._statusMap[t].frameState = n;
    }
  }
  find(t) {
    return this._statusMap[t];
  }
  hasPendingTiles(t, n) {
    return !this.pendingTilesRegister.isZero(t, n);
  }
}
class id extends Mn {
  constructor(t) {
    super(t), this._tileManager = void 0, this._tileManager = new rd();
  }
  traversalFinished(t) {
    return !this._tileManager.hasPendingTiles(t.viewport.id, this._frameNumber || 0);
  }
  shouldRefine(t, n) {
    return t._lodJudge = $f(t, n), t._lodJudge === "DIG";
  }
  updateChildTiles(t, n) {
    const s = t.header.children || [], r = t.children, i = t.tileset;
    for (const o of s) {
      const a = `${o.id}-${n.viewport.id}`, c = r && r.find((u) => u.id === a);
      if (c)
        c && this.updateTile(c, n);
      else {
        let u = () => this._loadTile(o.id, i);
        this._tileManager.find(a) ? this._tileManager.update(a, n) : (i.tileset.nodePages && (u = () => i.tileset.nodePagesTile.formTileFromNodePages(o.id)), this._tileManager.add(u, a, (h) => this._onTileLoad(h, t, a), n));
      }
    }
    return !1;
  }
  async _loadTile(t, n) {
    const {
      loader: s
    } = n, r = n.getTileUrl(`${n.url}/nodes/${t}`), i = {
      ...n.loadOptions,
      i3s: {
        ...n.loadOptions.i3s,
        isTileHeader: !0
      }
    };
    return await Fe(r, s, i);
  }
  _onTileLoad(t, n, s) {
    const r = new Cs(n.tileset, t, n, s);
    n.children.push(r);
    const i = this._tileManager.find(r.id).frameState;
    this.updateTile(r, i), this._frameNumber === i.frameNumber && (this.traversalFinished(i) || (/* @__PURE__ */ new Date()).getTime() - this.lastUpdate > this.updateDebounceTime) && this.executeTraversal(r, i);
  }
}
const od = {
  description: "",
  ellipsoid: H.WGS84,
  modelMatrix: new N(),
  throttleRequests: !0,
  maxRequests: 64,
  maximumMemoryUsage: 32,
  memoryCacheOverflow: 1,
  maximumTilesSelected: 0,
  debounceTime: 0,
  onTileLoad: () => {
  },
  onTileUnload: () => {
  },
  onTileError: () => {
  },
  onTraversalComplete: (e) => e,
  contentLoader: void 0,
  viewDistanceScale: 1,
  maximumScreenSpaceError: 8,
  memoryAdjustedScreenSpaceError: !1,
  loadTiles: !0,
  updateTransforms: !0,
  viewportTraversersMap: null,
  loadOptions: {
    fetch: {}
  },
  attributions: [],
  basePath: "",
  i3s: {}
}, qe = "Tiles In Tileset(s)", Xn = "Tiles In Memory", ni = "Tiles In View", si = "Tiles To Render", ri = "Tiles Loaded", Qn = "Tiles Loading", ii = "Tiles Unloaded", oi = "Failed Tile Loads", ai = "Points/Vertices", qn = "Tile Memory Use", ci = "Maximum Screen Space Error";
class ad {
  constructor(t, n) {
    this.options = void 0, this.loadOptions = void 0, this.type = void 0, this.tileset = void 0, this.loader = void 0, this.url = void 0, this.basePath = void 0, this.modelMatrix = void 0, this.ellipsoid = void 0, this.lodMetricType = void 0, this.lodMetricValue = void 0, this.refine = void 0, this.root = null, this.roots = {}, this.asset = {}, this.description = "", this.properties = void 0, this.extras = null, this.attributions = {}, this.credits = {}, this.stats = void 0, this.contentFormats = {
      draco: !1,
      meshopt: !1,
      dds: !1,
      ktx2: !1
    }, this.cartographicCenter = null, this.cartesianCenter = null, this.zoom = 1, this.boundingVolume = null, this.dynamicScreenSpaceErrorComputedDensity = 0, this.maximumMemoryUsage = 32, this.gpuMemoryUsageInBytes = 0, this.memoryAdjustedScreenSpaceError = 0, this._cacheBytes = 0, this._cacheOverflowBytes = 0, this._frameNumber = 0, this._queryParams = {}, this._extensionsUsed = [], this._tiles = {}, this._pendingCount = 0, this.selectedTiles = [], this.traverseCounter = 0, this.geometricError = 0, this.lastUpdatedVieports = null, this._requestedTiles = [], this._emptyTiles = [], this.frameStateData = {}, this._traverser = void 0, this._cache = new of(), this._requestScheduler = void 0, this.updatePromise = null, this.tilesetInitializationPromise = void 0, this.options = {
      ...od,
      ...n
    }, this.tileset = t, this.loader = t.loader, this.type = t.type, this.url = t.url, this.basePath = t.basePath || Os(this.url), this.modelMatrix = this.options.modelMatrix, this.ellipsoid = this.options.ellipsoid, this.lodMetricType = t.lodMetricType, this.lodMetricValue = t.lodMetricValue, this.refine = t.root.refine, this.loadOptions = this.options.loadOptions || {}, this._traverser = this._initializeTraverser(), this._requestScheduler = new Jc({
      throttleRequests: this.options.throttleRequests,
      maxRequests: this.options.maxRequests
    }), this.memoryAdjustedScreenSpaceError = this.options.maximumScreenSpaceError, this._cacheBytes = this.options.maximumMemoryUsage * 1024 * 1024, this._cacheOverflowBytes = this.options.memoryCacheOverflow * 1024 * 1024, this.stats = new so({
      id: this.url
    }), this._initializeStats(), this.tilesetInitializationPromise = this._initializeTileSet(t);
  }
  destroy() {
    this._destroy();
  }
  isLoaded() {
    return this._pendingCount === 0 && this._frameNumber !== 0 && this._requestedTiles.length === 0;
  }
  get tiles() {
    return Object.values(this._tiles);
  }
  get frameNumber() {
    return this._frameNumber;
  }
  get queryParams() {
    return new URLSearchParams(this._queryParams).toString();
  }
  setProps(t) {
    this.options = {
      ...this.options,
      ...t
    };
  }
  getTileUrl(t) {
    if (t.startsWith("data:"))
      return t;
    let s = t;
    return this.queryParams.length && (s = `${t}${t.includes("?") ? "&" : "?"}${this.queryParams}`), s;
  }
  hasExtension(t) {
    return this._extensionsUsed.indexOf(t) > -1;
  }
  update() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    this.tilesetInitializationPromise.then(() => {
      !t && this.lastUpdatedVieports ? t = this.lastUpdatedVieports : this.lastUpdatedVieports = t, t && this.doUpdate(t);
    });
  }
  async selectTiles() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    return await this.tilesetInitializationPromise, t && (this.lastUpdatedVieports = t), this.updatePromise || (this.updatePromise = new Promise((n) => {
      setTimeout(() => {
        this.lastUpdatedVieports && this.doUpdate(this.lastUpdatedVieports), n(this._frameNumber), this.updatePromise = null;
      }, this.options.debounceTime);
    })), this.updatePromise;
  }
  adjustScreenSpaceError() {
    this.gpuMemoryUsageInBytes < this._cacheBytes ? this.memoryAdjustedScreenSpaceError = Math.max(this.memoryAdjustedScreenSpaceError / 1.02, this.options.maximumScreenSpaceError) : this.gpuMemoryUsageInBytes > this._cacheBytes + this._cacheOverflowBytes && (this.memoryAdjustedScreenSpaceError *= 1.02);
  }
  doUpdate(t) {
    if ("loadTiles" in this.options && !this.options.loadTiles || this.traverseCounter > 0)
      return;
    const n = t instanceof Array ? t : [t];
    this._cache.reset(), this._frameNumber++, this.traverseCounter = n.length;
    const s = [];
    for (const r of n) {
      const i = r.id;
      this._needTraverse(i) ? s.push(i) : this.traverseCounter--;
    }
    for (const r of n) {
      const i = r.id;
      if (this.roots[i] || (this.roots[i] = this._initializeTileHeaders(this.tileset, null)), !s.includes(i))
        continue;
      const o = Of(r, this._frameNumber);
      this._traverser.traverse(this.roots[i], o, this.options);
    }
  }
  _needTraverse(t) {
    let n = t;
    return this.options.viewportTraversersMap && (n = this.options.viewportTraversersMap[t]), n === t;
  }
  _onTraversalEnd(t) {
    const n = t.viewport.id;
    this.frameStateData[n] || (this.frameStateData[n] = {
      selectedTiles: [],
      _requestedTiles: [],
      _emptyTiles: []
    });
    const s = this.frameStateData[n], r = Object.values(this._traverser.selectedTiles), [i, o] = vf(r, t, this.options.maximumTilesSelected);
    s.selectedTiles = i;
    for (const a of o)
      a.unselect();
    s._requestedTiles = Object.values(this._traverser.requestedTiles), s._emptyTiles = Object.values(this._traverser.emptyTiles), this.traverseCounter--, !(this.traverseCounter > 0) && this._updateTiles();
  }
  _updateTiles() {
    this.selectedTiles = [], this._requestedTiles = [], this._emptyTiles = [];
    for (const t in this.frameStateData) {
      const n = this.frameStateData[t];
      this.selectedTiles = this.selectedTiles.concat(n.selectedTiles), this._requestedTiles = this._requestedTiles.concat(n._requestedTiles), this._emptyTiles = this._emptyTiles.concat(n._emptyTiles);
    }
    this.selectedTiles = this.options.onTraversalComplete(this.selectedTiles);
    for (const t of this.selectedTiles)
      this._tiles[t.id] = t;
    this._loadTiles(), this._unloadTiles(), this._updateStats();
  }
  _tilesChanged(t, n) {
    if (t.length !== n.length)
      return !0;
    const s = new Set(t.map((o) => o.id)), r = new Set(n.map((o) => o.id));
    let i = t.filter((o) => !r.has(o.id)).length > 0;
    return i = i || n.filter((o) => !s.has(o.id)).length > 0, i;
  }
  _loadTiles() {
    for (const t of this._requestedTiles)
      t.contentUnloaded && this._loadTile(t);
  }
  _unloadTiles() {
    this._cache.unloadTiles(this, (t, n) => t._unloadTile(n));
  }
  _updateStats() {
    let t = 0, n = 0;
    for (const s of this.selectedTiles)
      s.contentAvailable && s.content && (t++, s.content.pointCount ? n += s.content.pointCount : n += s.content.vertexCount);
    this.stats.get(ni).count = this.selectedTiles.length, this.stats.get(si).count = t, this.stats.get(ai).count = n, this.stats.get(ci).count = this.memoryAdjustedScreenSpaceError;
  }
  async _initializeTileSet(t) {
    this.type === dt.I3S && (this.calculateViewPropsI3S(), t.root = await t.root), this.root = this._initializeTileHeaders(t, null), this.type === dt.TILES3D && (this._initializeTiles3DTileset(t), this.calculateViewPropsTiles3D()), this.type === dt.I3S && this._initializeI3STileset();
  }
  calculateViewPropsI3S() {
    var t;
    const n = this.tileset.fullExtent;
    if (n) {
      const {
        xmin: r,
        xmax: i,
        ymin: o,
        ymax: a,
        zmin: c,
        zmax: u
      } = n;
      this.cartographicCenter = new m(r + (i - r) / 2, o + (a - o) / 2, c + (u - c) / 2), this.cartesianCenter = new m(), H.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = Go(n, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    const s = (t = this.tileset.store) === null || t === void 0 ? void 0 : t.extent;
    if (s) {
      const [r, i, o, a] = s;
      this.cartographicCenter = new m(r + (o - r) / 2, i + (a - i) / 2, 0), this.cartesianCenter = new m(), H.WGS84.cartographicToCartesian(this.cartographicCenter, this.cartesianCenter), this.zoom = Pf(s, this.cartographicCenter, this.cartesianCenter);
      return;
    }
    console.warn("Extent is not defined in the tileset header"), this.cartographicCenter = new m(), this.zoom = 1;
  }
  calculateViewPropsTiles3D() {
    const t = this.root, {
      center: n
    } = t.boundingVolume;
    if (!n) {
      console.warn("center was not pre-calculated for the root tile"), this.cartographicCenter = new m(), this.zoom = 1;
      return;
    }
    n[0] !== 0 || n[1] !== 0 || n[2] !== 0 ? (this.cartographicCenter = new m(), H.WGS84.cartesianToCartographic(n, this.cartographicCenter)) : this.cartographicCenter = new m(0, 0, -H.WGS84.radii[0]), this.cartesianCenter = n, this.zoom = Uf(t.boundingVolume, this.cartographicCenter);
  }
  _initializeStats() {
    this.stats.get(qe), this.stats.get(Qn), this.stats.get(Xn), this.stats.get(ni), this.stats.get(si), this.stats.get(ri), this.stats.get(ii), this.stats.get(oi), this.stats.get(ai), this.stats.get(qn, "memory"), this.stats.get(ci);
  }
  _initializeTileHeaders(t, n) {
    const s = new Cs(this, t.root, n);
    if (n && (n.children.push(s), s.depth = n.depth + 1), this.type === dt.TILES3D) {
      const i = [];
      for (i.push(s); i.length > 0; ) {
        const o = i.pop();
        this.stats.get(qe).incrementCount();
        const a = o.header.children || [];
        for (const c of a) {
          var r;
          const u = new Cs(this, c, o);
          if ((r = u.contentUrl) !== null && r !== void 0 && r.includes("?session=")) {
            const h = new URL(u.contentUrl).searchParams.get("session");
            h && (this._queryParams.session = h);
          }
          o.children.push(u), u.depth = o.depth + 1, i.push(u);
        }
      }
    }
    return s;
  }
  _initializeTraverser() {
    let t;
    switch (this.type) {
      case dt.TILES3D:
        t = nd;
        break;
      case dt.I3S:
        t = id;
        break;
      default:
        t = Mn;
    }
    return new t({
      basePath: this.basePath,
      onTraversalEnd: this._onTraversalEnd.bind(this)
    });
  }
  _destroyTileHeaders(t) {
    this._destroySubtree(t);
  }
  async _loadTile(t) {
    let n;
    try {
      this._onStartTileLoading(), n = await t.loadContent();
    } catch (s) {
      this._onTileLoadError(t, s instanceof Error ? s : new Error("load failed"));
    } finally {
      this._onEndTileLoading(), this._onTileLoad(t, n);
    }
  }
  _onTileLoadError(t, n) {
    this.stats.get(oi).incrementCount();
    const s = n.message || n.toString(), r = t.url;
    console.error(`A 3D tile failed to load: ${t.url} ${s}`), this.options.onTileError(t, s, r);
  }
  _onTileLoad(t, n) {
    if (n) {
      if (this.type === dt.I3S) {
        var s, r;
        const i = ((s = this.tileset) === null || s === void 0 || (r = s.nodePagesTile) === null || r === void 0 ? void 0 : r.nodesInNodePages) || 0;
        this.stats.get(qe).reset(), this.stats.get(qe).addCount(i);
      }
      t && t.content && af(t, t.content), this.updateContentTypes(t), this._addTileToCache(t), this.options.onTileLoad(t);
    }
  }
  updateContentTypes(t) {
    if (this.type === dt.I3S)
      switch (t.header.isDracoGeometry && (this.contentFormats.draco = !0), t.header.textureFormat) {
        case "dds":
          this.contentFormats.dds = !0;
          break;
        case "ktx2":
          this.contentFormats.ktx2 = !0;
          break;
      }
    else if (this.type === dt.TILES3D) {
      var n;
      const {
        extensionsRemoved: s = []
      } = ((n = t.content) === null || n === void 0 ? void 0 : n.gltf) || {};
      s.includes("KHR_draco_mesh_compression") && (this.contentFormats.draco = !0), s.includes("EXT_meshopt_compression") && (this.contentFormats.meshopt = !0), s.includes("KHR_texture_basisu") && (this.contentFormats.ktx2 = !0);
    }
  }
  _onStartTileLoading() {
    this._pendingCount++, this.stats.get(Qn).incrementCount();
  }
  _onEndTileLoading() {
    this._pendingCount--, this.stats.get(Qn).decrementCount();
  }
  _addTileToCache(t) {
    this._cache.add(this, t, (n) => n._updateCacheStats(t));
  }
  _updateCacheStats(t) {
    this.stats.get(ri).incrementCount(), this.stats.get(Xn).incrementCount(), this.gpuMemoryUsageInBytes += t.gpuMemoryUsageInBytes || 0, this.stats.get(qn).count = this.gpuMemoryUsageInBytes, this.options.memoryAdjustedScreenSpaceError && this.adjustScreenSpaceError();
  }
  _unloadTile(t) {
    this.gpuMemoryUsageInBytes -= t.gpuMemoryUsageInBytes || 0, this.stats.get(Xn).decrementCount(), this.stats.get(ii).incrementCount(), this.stats.get(qn).count = this.gpuMemoryUsageInBytes, this.options.onTileUnload(t), t.unloadContent();
  }
  _destroy() {
    const t = [];
    for (this.root && t.push(this.root); t.length > 0; ) {
      const n = t.pop();
      for (const s of n.children)
        t.push(s);
      this._destroyTile(n);
    }
    this.root = null;
  }
  _destroySubtree(t) {
    const n = t, s = [];
    for (s.push(n); s.length > 0; ) {
      t = s.pop();
      for (const r of t.children)
        s.push(r);
      t !== n && this._destroyTile(t);
    }
    n.children = [];
  }
  _destroyTile(t) {
    this._cache.unloadTile(this, t), this._unloadTile(t), t.destroy();
  }
  _initializeTiles3DTileset(t) {
    if (t.queryString) {
      const n = new URLSearchParams(t.queryString), s = Object.fromEntries(n.entries());
      this._queryParams = {
        ...this._queryParams,
        ...s
      };
    }
    if (this.asset = t.asset, !this.asset)
      throw new Error("Tileset must have an asset property.");
    if (this.asset.version !== "0.0" && this.asset.version !== "1.0" && this.asset.version !== "1.1")
      throw new Error("The tileset must be 3D Tiles version either 0.0 or 1.0 or 1.1.");
    "tilesetVersion" in this.asset && (this._queryParams.v = this.asset.tilesetVersion), this.credits = {
      attributions: this.options.attributions || []
    }, this.description = this.options.description || "", this.properties = t.properties, this.geometricError = t.geometricError, this._extensionsUsed = t.extensionsUsed || [], this.extras = t.extras;
  }
  _initializeI3STileset() {
    this.loadOptions.i3s && "token" in this.loadOptions.i3s && (this._queryParams.token = this.loadOptions.i3s.token);
  }
}
const Vo = "4.1.1", de = {
  COMPOSITE: "cmpt",
  POINT_CLOUD: "pnts",
  BATCHED_3D_MODEL: "b3dm",
  INSTANCED_3D_MODEL: "i3dm",
  GEOMETRY: "geom",
  VECTOR: "vect",
  GLTF: "glTF"
};
function ko(e, t, n) {
  U(e instanceof ArrayBuffer);
  const s = new TextDecoder("utf8"), r = new Uint8Array(e, t, n);
  return s.decode(r);
}
function cd(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  const n = new DataView(e);
  return `${String.fromCharCode(n.getUint8(t + 0))}${String.fromCharCode(n.getUint8(t + 1))}${String.fromCharCode(n.getUint8(t + 2))}${String.fromCharCode(n.getUint8(t + 3))}`;
}
const ud = "4.1.1", ld = {
  name: "Draco",
  id: "draco",
  module: "draco",
  version: ud,
  worker: !0,
  extensions: ["drc"],
  mimeTypes: ["application/octet-stream"],
  binary: !0,
  tests: ["DRACO"],
  options: {
    draco: {
      decoderType: typeof WebAssembly == "object" ? "wasm" : "js",
      libraryPath: "libs/",
      extraAttributes: {},
      attributeNameEntry: void 0
    }
  }
};
function hd(e, t, n) {
  const s = jo(t.metadata), r = [], i = fd(t.attributes);
  for (const o in e) {
    const a = e[o], c = ui(o, a, i[o]);
    r.push(c);
  }
  if (n) {
    const o = ui("indices", n);
    r.push(o);
  }
  return {
    fields: r,
    metadata: s
  };
}
function fd(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    t[s.name || "undefined"] = s;
  }
  return t;
}
function ui(e, t, n) {
  const s = n ? jo(n.metadata) : void 0;
  return al(e, t, s);
}
function jo(e) {
  Object.entries(e);
  const t = {};
  for (const n in e)
    t[`${n}.string`] = JSON.stringify(e[n]);
  return t;
}
const li = {
  POSITION: "POSITION",
  NORMAL: "NORMAL",
  COLOR: "COLOR_0",
  TEX_COORD: "TEXCOORD_0"
}, dd = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
}, md = 4;
class Ad {
  constructor(t) {
    this.draco = void 0, this.decoder = void 0, this.metadataQuerier = void 0, this.draco = t, this.decoder = new this.draco.Decoder(), this.metadataQuerier = new this.draco.MetadataQuerier();
  }
  destroy() {
    this.draco.destroy(this.decoder), this.draco.destroy(this.metadataQuerier);
  }
  parseSync(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const s = new this.draco.DecoderBuffer();
    s.Init(new Int8Array(t), t.byteLength), this._disableAttributeTransforms(n);
    const r = this.decoder.GetEncodedGeometryType(s), i = r === this.draco.TRIANGULAR_MESH ? new this.draco.Mesh() : new this.draco.PointCloud();
    try {
      let o;
      switch (r) {
        case this.draco.TRIANGULAR_MESH:
          o = this.decoder.DecodeBufferToMesh(s, i);
          break;
        case this.draco.POINT_CLOUD:
          o = this.decoder.DecodeBufferToPointCloud(s, i);
          break;
        default:
          throw new Error("DRACO: Unknown geometry type.");
      }
      if (!o.ok() || !i.ptr) {
        const f = `DRACO decompression failed: ${o.error_msg()}`;
        throw new Error(f);
      }
      const a = this._getDracoLoaderData(i, r, n), c = this._getMeshData(i, a, n), u = ol(c.attributes), l = hd(c.attributes, a, c.indices);
      return {
        loader: "draco",
        loaderData: a,
        header: {
          vertexCount: i.num_points(),
          boundingBox: u
        },
        ...c,
        schema: l
      };
    } finally {
      this.draco.destroy(s), i && this.draco.destroy(i);
    }
  }
  _getDracoLoaderData(t, n, s) {
    const r = this._getTopLevelMetadata(t), i = this._getDracoAttributes(t, s);
    return {
      geometry_type: n,
      num_attributes: t.num_attributes(),
      num_points: t.num_points(),
      num_faces: t instanceof this.draco.Mesh ? t.num_faces() : 0,
      metadata: r,
      attributes: i
    };
  }
  _getDracoAttributes(t, n) {
    const s = {};
    for (let r = 0; r < t.num_attributes(); r++) {
      const i = this.decoder.GetAttribute(t, r), o = this._getAttributeMetadata(t, r);
      s[i.unique_id()] = {
        unique_id: i.unique_id(),
        attribute_type: i.attribute_type(),
        data_type: i.data_type(),
        num_components: i.num_components(),
        byte_offset: i.byte_offset(),
        byte_stride: i.byte_stride(),
        normalized: i.normalized(),
        attribute_index: r,
        metadata: o
      };
      const a = this._getQuantizationTransform(i, n);
      a && (s[i.unique_id()].quantization_transform = a);
      const c = this._getOctahedronTransform(i, n);
      c && (s[i.unique_id()].octahedron_transform = c);
    }
    return s;
  }
  _getMeshData(t, n, s) {
    const r = this._getMeshAttributes(n, t, s);
    if (!r.POSITION)
      throw new Error("DRACO: No position attribute found.");
    if (t instanceof this.draco.Mesh)
      switch (s.topology) {
        case "triangle-strip":
          return {
            topology: "triangle-strip",
            mode: 4,
            attributes: r,
            indices: {
              value: this._getTriangleStripIndices(t),
              size: 1
            }
          };
        case "triangle-list":
        default:
          return {
            topology: "triangle-list",
            mode: 5,
            attributes: r,
            indices: {
              value: this._getTriangleListIndices(t),
              size: 1
            }
          };
      }
    return {
      topology: "point-list",
      mode: 0,
      attributes: r
    };
  }
  _getMeshAttributes(t, n, s) {
    const r = {};
    for (const i of Object.values(t.attributes)) {
      const o = this._deduceAttributeName(i, s);
      i.name = o;
      const {
        value: a,
        size: c
      } = this._getAttributeValues(n, i);
      r[o] = {
        value: a,
        size: c,
        byteOffset: i.byte_offset,
        byteStride: i.byte_stride,
        normalized: i.normalized
      };
    }
    return r;
  }
  _getTriangleListIndices(t) {
    const s = t.num_faces() * 3, r = s * md, i = this.draco._malloc(r);
    try {
      return this.decoder.GetTrianglesUInt32Array(t, r, i), new Uint32Array(this.draco.HEAPF32.buffer, i, s).slice();
    } finally {
      this.draco._free(i);
    }
  }
  _getTriangleStripIndices(t) {
    const n = new this.draco.DracoInt32Array();
    try {
      return this.decoder.GetTriangleStripsFromMesh(t, n), Bd(n);
    } finally {
      this.draco.destroy(n);
    }
  }
  _getAttributeValues(t, n) {
    const s = dd[n.data_type], r = n.num_components, o = t.num_points() * r, a = o * s.BYTES_PER_ELEMENT, c = gd(this.draco, s);
    let u;
    const l = this.draco._malloc(a);
    try {
      const h = this.decoder.GetAttribute(t, n.attribute_index);
      this.decoder.GetAttributeDataArrayForAllPoints(t, h, c, a, l), u = new s(this.draco.HEAPF32.buffer, l, o).slice();
    } finally {
      this.draco._free(l);
    }
    return {
      value: u,
      size: r
    };
  }
  _deduceAttributeName(t, n) {
    const s = t.unique_id;
    for (const [o, a] of Object.entries(n.extraAttributes || {}))
      if (a === s)
        return o;
    const r = t.attribute_type;
    for (const o in li)
      if (this.draco[o] === r)
        return li[o];
    const i = n.attributeNameEntry || "name";
    return t.metadata[i] ? t.metadata[i].string : `CUSTOM_ATTRIBUTE_${s}`;
  }
  _getTopLevelMetadata(t) {
    const n = this.decoder.GetMetadata(t);
    return this._getDracoMetadata(n);
  }
  _getAttributeMetadata(t, n) {
    const s = this.decoder.GetAttributeMetadata(t, n);
    return this._getDracoMetadata(s);
  }
  _getDracoMetadata(t) {
    if (!t || !t.ptr)
      return {};
    const n = {}, s = this.metadataQuerier.NumEntries(t);
    for (let r = 0; r < s; r++) {
      const i = this.metadataQuerier.GetEntryName(t, r);
      n[i] = this._getDracoMetadataField(t, i);
    }
    return n;
  }
  _getDracoMetadataField(t, n) {
    const s = new this.draco.DracoInt32Array();
    try {
      this.metadataQuerier.GetIntEntryArray(t, n, s);
      const r = pd(s);
      return {
        int: this.metadataQuerier.GetIntEntry(t, n),
        string: this.metadataQuerier.GetStringEntry(t, n),
        double: this.metadataQuerier.GetDoubleEntry(t, n),
        intArray: r
      };
    } finally {
      this.draco.destroy(s);
    }
  }
  _disableAttributeTransforms(t) {
    const {
      quantizedAttributes: n = [],
      octahedronAttributes: s = []
    } = t, r = [...n, ...s];
    for (const i of r)
      this.decoder.SkipAttributeTransform(this.draco[i]);
  }
  _getQuantizationTransform(t, n) {
    const {
      quantizedAttributes: s = []
    } = n, r = t.attribute_type();
    if (s.map((o) => this.decoder[o]).includes(r)) {
      const o = new this.draco.AttributeQuantizationTransform();
      try {
        if (o.InitFromAttribute(t))
          return {
            quantization_bits: o.quantization_bits(),
            range: o.range(),
            min_values: new Float32Array([1, 2, 3]).map((a) => o.min_value(a))
          };
      } finally {
        this.draco.destroy(o);
      }
    }
    return null;
  }
  _getOctahedronTransform(t, n) {
    const {
      octahedronAttributes: s = []
    } = n, r = t.attribute_type();
    if (s.map((o) => this.decoder[o]).includes(r)) {
      const o = new this.draco.AttributeQuantizationTransform();
      try {
        if (o.InitFromAttribute(t))
          return {
            quantization_bits: o.quantization_bits()
          };
      } finally {
        this.draco.destroy(o);
      }
    }
    return null;
  }
}
function gd(e, t) {
  switch (t) {
    case Float32Array:
      return e.DT_FLOAT32;
    case Int8Array:
      return e.DT_INT8;
    case Int16Array:
      return e.DT_INT16;
    case Int32Array:
      return e.DT_INT32;
    case Uint8Array:
      return e.DT_UINT8;
    case Uint16Array:
      return e.DT_UINT16;
    case Uint32Array:
      return e.DT_UINT32;
    default:
      return e.DT_INVALID;
  }
}
function pd(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
function Bd(e) {
  const t = e.size(), n = new Int32Array(t);
  for (let s = 0; s < t; s++)
    n[s] = e.GetValue(s);
  return n;
}
const yd = "1.5.6", Cd = "1.4.1", Yn = `https://www.gstatic.com/draco/versioned/decoders/${yd}`, ot = {
  DECODER: "draco_wasm_wrapper.js",
  DECODER_WASM: "draco_decoder.wasm",
  FALLBACK_DECODER: "draco_decoder.js",
  ENCODER: "draco_encoder.js"
}, $n = {
  [ot.DECODER]: `${Yn}/${ot.DECODER}`,
  [ot.DECODER_WASM]: `${Yn}/${ot.DECODER_WASM}`,
  [ot.FALLBACK_DECODER]: `${Yn}/${ot.FALLBACK_DECODER}`,
  [ot.ENCODER]: `https://raw.githubusercontent.com/google/draco/${Cd}/javascript/${ot.ENCODER}`
};
let me;
async function Td(e) {
  const t = e.modules || {};
  return t.draco3d ? me = me || t.draco3d.createDecoderModule({}).then((n) => ({
    draco: n
  })) : me = me || Ed(e), await me;
}
async function Ed(e) {
  let t, n;
  switch (e.draco && e.draco.decoderType) {
    case "js":
      t = await zt($n[ot.FALLBACK_DECODER], "draco", e, ot.FALLBACK_DECODER);
      break;
    case "wasm":
    default:
      [t, n] = await Promise.all([await zt($n[ot.DECODER], "draco", e, ot.DECODER), await zt($n[ot.DECODER_WASM], "draco", e, ot.DECODER_WASM)]);
  }
  return t = t || globalThis.DracoDecoderModule, await bd(t, n);
}
function bd(e, t) {
  const n = {};
  return t && (n.wasmBinary = t), new Promise((s) => {
    e({
      ...n,
      onModuleLoaded: (r) => s({
        draco: r
      })
    });
  });
}
const Ko = {
  ...ld,
  parse: _d
};
async function _d(e, t) {
  const {
    draco: n
  } = await Td(t), s = new Ad(n);
  try {
    return s.parseSync(e, t == null ? void 0 : t.draco);
  } finally {
    s.destroy();
  }
}
const wd = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, X = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DOUBLE: 5130
}, x = {
  ...wd,
  ...X
}, Zn = {
  [X.DOUBLE]: Float64Array,
  [X.FLOAT]: Float32Array,
  [X.UNSIGNED_SHORT]: Uint16Array,
  [X.UNSIGNED_INT]: Uint32Array,
  [X.UNSIGNED_BYTE]: Uint8Array,
  [X.BYTE]: Int8Array,
  [X.SHORT]: Int16Array,
  [X.INT]: Int32Array
}, Md = {
  DOUBLE: X.DOUBLE,
  FLOAT: X.FLOAT,
  UNSIGNED_SHORT: X.UNSIGNED_SHORT,
  UNSIGNED_INT: X.UNSIGNED_INT,
  UNSIGNED_BYTE: X.UNSIGNED_BYTE,
  BYTE: X.BYTE,
  SHORT: X.SHORT,
  INT: X.INT
}, ts = "Failed to convert GL type";
class Dt {
  static fromTypedArray(t) {
    t = ArrayBuffer.isView(t) ? t.constructor : t;
    for (const n in Zn)
      if (Zn[n] === t)
        return n;
    throw new Error(ts);
  }
  static fromName(t) {
    const n = Md[t];
    if (!n)
      throw new Error(ts);
    return n;
  }
  static getArrayType(t) {
    switch (t) {
      case X.UNSIGNED_SHORT_5_6_5:
      case X.UNSIGNED_SHORT_4_4_4_4:
      case X.UNSIGNED_SHORT_5_5_5_1:
        return Uint16Array;
      default:
        const n = Zn[t];
        if (!n)
          throw new Error(ts);
        return n;
    }
  }
  static getByteSize(t) {
    return Dt.getArrayType(t).BYTES_PER_ELEMENT;
  }
  static validate(t) {
    return !!Dt.getArrayType(t);
  }
  static createTypedArray(t, n) {
    let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, r = arguments.length > 3 ? arguments[3] : void 0;
    r === void 0 && (r = (n.byteLength - s) / Dt.getByteSize(t));
    const i = Dt.getArrayType(t);
    return new i(n, s, r);
  }
}
function Rd(e, t) {
  if (!e)
    throw new Error(`math.gl assertion failed. ${t}`);
}
function Id(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0, 0, 0];
  const n = e >> 11 & 31, s = e >> 5 & 63, r = e & 31;
  return t[0] = n << 3, t[1] = s << 2, t[2] = r << 3, t;
}
new bn();
new m();
new bn();
new bn();
function hi(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 255;
  return Al(e, 0, t) / t * 2 - 1;
}
function fi(e) {
  return e < 0 ? -1 : 1;
}
function Sd(e, t, n, s) {
  if (Rd(s), e < 0 || e > n || t < 0 || t > n)
    throw new Error(`x and y must be unsigned normalized integers between 0 and ${n}`);
  if (s.x = hi(e, n), s.y = hi(t, n), s.z = 1 - (Math.abs(s.x) + Math.abs(s.y)), s.z < 0) {
    const r = s.x;
    s.x = (1 - Math.abs(s.y)) * fi(r), s.y = (1 - Math.abs(r)) * fi(s.y);
  }
  return s.normalize();
}
function Dd(e, t, n) {
  return Sd(e, t, 255, n);
}
class Vs {
  constructor(t, n) {
    this.json = void 0, this.buffer = void 0, this.featuresLength = 0, this._cachedTypedArrays = {}, this.json = t, this.buffer = n;
  }
  getExtension(t) {
    return this.json.extensions && this.json.extensions[t];
  }
  hasProperty(t) {
    return !!this.json[t];
  }
  getGlobalProperty(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x.UNSIGNED_INT, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    const r = this.json[t];
    return r && Number.isFinite(r.byteOffset) ? this._getTypedArrayFromBinary(t, n, s, 1, r.byteOffset) : r;
  }
  getPropertyArray(t, n, s) {
    const r = this.json[t];
    return r && Number.isFinite(r.byteOffset) ? ("componentType" in r && (n = Dt.fromName(r.componentType)), this._getTypedArrayFromBinary(t, n, s, this.featuresLength, r.byteOffset)) : this._getTypedArrayFromArray(t, n, r);
  }
  getProperty(t, n, s, r, i) {
    const o = this.json[t];
    if (!o)
      return o;
    const a = this.getPropertyArray(t, n, s);
    if (s === 1)
      return a[r];
    for (let c = 0; c < s; ++c)
      i[c] = a[s * r + c];
    return i;
  }
  _getTypedArrayFromBinary(t, n, s, r, i) {
    const o = this._cachedTypedArrays;
    let a = o[t];
    return a || (a = Dt.createTypedArray(n, this.buffer.buffer, this.buffer.byteOffset + i, r * s), o[t] = a), a;
  }
  _getTypedArrayFromArray(t, n, s) {
    const r = this._cachedTypedArrays;
    let i = r[t];
    return i || (i = Dt.createTypedArray(n, s), r[t] = i), i;
  }
}
const Fd = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Od = {
  SCALAR: (e, t) => e[t],
  VEC2: (e, t) => [e[2 * t + 0], e[2 * t + 1]],
  VEC3: (e, t) => [e[3 * t + 0], e[3 * t + 1], e[3 * t + 2]],
  VEC4: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT2: (e, t) => [e[4 * t + 0], e[4 * t + 1], e[4 * t + 2], e[4 * t + 3]],
  MAT3: (e, t) => [e[9 * t + 0], e[9 * t + 1], e[9 * t + 2], e[9 * t + 3], e[9 * t + 4], e[9 * t + 5], e[9 * t + 6], e[9 * t + 7], e[9 * t + 8]],
  MAT4: (e, t) => [e[16 * t + 0], e[16 * t + 1], e[16 * t + 2], e[16 * t + 3], e[16 * t + 4], e[16 * t + 5], e[16 * t + 6], e[16 * t + 7], e[16 * t + 8], e[16 * t + 9], e[16 * t + 10], e[16 * t + 11], e[16 * t + 12], e[16 * t + 13], e[16 * t + 14], e[16 * t + 15]]
}, vd = {
  SCALAR: (e, t, n) => {
    t[n] = e;
  },
  VEC2: (e, t, n) => {
    t[2 * n + 0] = e[0], t[2 * n + 1] = e[1];
  },
  VEC3: (e, t, n) => {
    t[3 * n + 0] = e[0], t[3 * n + 1] = e[1], t[3 * n + 2] = e[2];
  },
  VEC4: (e, t, n) => {
    t[4 * n + 0] = e[0], t[4 * n + 1] = e[1], t[4 * n + 2] = e[2], t[4 * n + 3] = e[3];
  },
  MAT2: (e, t, n) => {
    t[4 * n + 0] = e[0], t[4 * n + 1] = e[1], t[4 * n + 2] = e[2], t[4 * n + 3] = e[3];
  },
  MAT3: (e, t, n) => {
    t[9 * n + 0] = e[0], t[9 * n + 1] = e[1], t[9 * n + 2] = e[2], t[9 * n + 3] = e[3], t[9 * n + 4] = e[4], t[9 * n + 5] = e[5], t[9 * n + 6] = e[6], t[9 * n + 7] = e[7], t[9 * n + 8] = e[8], t[9 * n + 9] = e[9];
  },
  MAT4: (e, t, n) => {
    t[16 * n + 0] = e[0], t[16 * n + 1] = e[1], t[16 * n + 2] = e[2], t[16 * n + 3] = e[3], t[16 * n + 4] = e[4], t[16 * n + 5] = e[5], t[16 * n + 6] = e[6], t[16 * n + 7] = e[7], t[16 * n + 8] = e[8], t[16 * n + 9] = e[9], t[16 * n + 10] = e[10], t[16 * n + 11] = e[11], t[16 * n + 12] = e[12], t[16 * n + 13] = e[13], t[16 * n + 14] = e[14], t[16 * n + 15] = e[15];
  }
};
function xd(e, t, n, s) {
  const {
    componentType: r
  } = e;
  U(e.componentType);
  const i = typeof r == "string" ? Dt.fromName(r) : r, o = Fd[e.type], a = Od[e.type], c = vd[e.type];
  return n += e.byteOffset, {
    values: Dt.createTypedArray(i, t, n, o * s),
    type: i,
    size: o,
    unpacker: a,
    packer: c
  };
}
const It = (e) => e !== void 0;
function Ld(e, t, n) {
  if (!t)
    return null;
  let s = e.getExtension("3DTILES_batch_table_hierarchy");
  const r = t.HIERARCHY;
  return r && (console.warn("3D Tile Parser: HIERARCHY is deprecated. Use 3DTILES_batch_table_hierarchy."), t.extensions = t.extensions || {}, t.extensions["3DTILES_batch_table_hierarchy"] = r, s = r), s ? Gd(s, n) : null;
}
function Gd(e, t) {
  let n, s, r;
  const i = e.instancesLength, o = e.classes;
  let a = e.classIds, c = e.parentCounts, u = e.parentIds, l = i;
  It(a.byteOffset) && (a.componentType = defaultValue(a.componentType, GL.UNSIGNED_SHORT), a.type = AttributeType.SCALAR, r = getBinaryAccessor(a), a = r.createArrayBufferView(t.buffer, t.byteOffset + a.byteOffset, i));
  let h;
  if (It(c))
    for (It(c.byteOffset) && (c.componentType = defaultValue(c.componentType, GL.UNSIGNED_SHORT), c.type = AttributeType.SCALAR, r = getBinaryAccessor(c), c = r.createArrayBufferView(t.buffer, t.byteOffset + c.byteOffset, i)), h = new Uint16Array(i), l = 0, n = 0; n < i; ++n)
      h[n] = l, l += c[n];
  It(u) && It(u.byteOffset) && (u.componentType = defaultValue(u.componentType, GL.UNSIGNED_SHORT), u.type = AttributeType.SCALAR, r = getBinaryAccessor(u), u = r.createArrayBufferView(t.buffer, t.byteOffset + u.byteOffset, l));
  const f = o.length;
  for (n = 0; n < f; ++n) {
    const p = o[n].length, y = o[n].instances, _ = getBinaryProperties(p, y, t);
    o[n].instances = combine(_, y);
  }
  const d = new Array(f).fill(0), A = new Uint16Array(i);
  for (n = 0; n < i; ++n)
    s = a[n], A[n] = d[s], ++d[s];
  const g = {
    classes: o,
    classIds: a,
    classIndexes: A,
    parentCounts: c,
    parentIndexes: h,
    parentIds: u
  };
  return Nd(g), g;
}
function Ae(e, t, n) {
  if (!e)
    return;
  const s = e.parentCounts;
  return e.parentIds ? n(e, t) : s > 0 ? Ud(e, t, n) : Pd(e, t, n);
}
function Ud(e, t, n) {
  const s = e.classIds, r = e.parentCounts, i = e.parentIds, o = e.parentIndexes, a = s.length, c = scratchVisited;
  c.length = Math.max(c.length, a);
  const u = ++marker, l = scratchStack;
  for (l.length = 0, l.push(t); l.length > 0; ) {
    if (t = l.pop(), c[t] === u)
      continue;
    c[t] = u;
    const h = n(e, t);
    if (It(h))
      return h;
    const f = r[t], d = o[t];
    for (let A = 0; A < f; ++A) {
      const g = i[d + A];
      g !== t && l.push(g);
    }
  }
  return null;
}
function Pd(e, t, n) {
  let s = !0;
  for (; s; ) {
    const r = n(e, t);
    if (It(r))
      return r;
    const i = e.parentIds[t];
    s = i !== t, t = i;
  }
  throw new Error("traverseHierarchySingleParent");
}
function Nd(e) {
  const n = e.classIds.length;
  for (let s = 0; s < n; ++s)
    zo(e, s, stack);
}
function zo(e, t, n) {
  const s = e.parentCounts, r = e.parentIds, i = e.parentIndexes, a = e.classIds.length;
  if (!It(r))
    return;
  assert(t < a, `Parent index ${t} exceeds the total number of instances: ${a}`), assert(n.indexOf(t) === -1, "Circular dependency detected in the batch table hierarchy."), n.push(t);
  const c = It(s) ? s[t] : 1, u = It(s) ? i[t] : t;
  for (let l = 0; l < c; ++l) {
    const h = r[u + l];
    h !== t && zo(e, h, n);
  }
  n.pop(t);
}
function rt(e) {
  return e != null;
}
const Ye = (e, t) => e, Hd = {
  HIERARCHY: !0,
  extensions: !0,
  extras: !0
};
class Wo {
  constructor(t, n, s) {
    var r;
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    this.json = void 0, this.binary = void 0, this.featureCount = void 0, this._extensions = void 0, this._properties = void 0, this._binaryProperties = void 0, this._hierarchy = void 0, U(s >= 0), this.json = t || {}, this.binary = n, this.featureCount = s, this._extensions = ((r = this.json) === null || r === void 0 ? void 0 : r.extensions) || {}, this._properties = {};
    for (const o in this.json)
      Hd[o] || (this._properties[o] = this.json[o]);
    this._binaryProperties = this._initializeBinaryProperties(), i["3DTILES_batch_table_hierarchy"] && (this._hierarchy = Ld(this, this.json, this.binary));
  }
  getExtension(t) {
    return this.json && this.json.extensions && this.json.extensions[t];
  }
  memorySizeInBytes() {
    return 0;
  }
  isClass(t, n) {
    if (this._checkBatchId(t), U(typeof n == "string", n), this._hierarchy) {
      const s = Ae(this._hierarchy, t, (r, i) => {
        const o = r.classIds[i];
        return r.classes[o].name === n;
      });
      return rt(s);
    }
    return !1;
  }
  isExactClass(t, n) {
    return U(typeof n == "string", n), this.getExactClassName(t) === n;
  }
  getExactClassName(t) {
    if (this._checkBatchId(t), this._hierarchy) {
      const n = this._hierarchy.classIds[t];
      return this._hierarchy.classes[n].name;
    }
  }
  hasProperty(t, n) {
    return this._checkBatchId(t), U(typeof n == "string", n), rt(this._properties[n]) || this._hasPropertyInHierarchy(t, n);
  }
  getPropertyNames(t, n) {
    this._checkBatchId(t), n = rt(n) ? n : [], n.length = 0;
    const s = Object.keys(this._properties);
    return n.push(...s), this._hierarchy && this._getPropertyNamesInHierarchy(t, n), n;
  }
  getProperty(t, n) {
    if (this._checkBatchId(t), U(typeof n == "string", n), this._binaryProperties) {
      const r = this._binaryProperties[n];
      if (rt(r))
        return this._getBinaryProperty(r, t);
    }
    const s = this._properties[n];
    if (rt(s))
      return Ye(s[t]);
    if (this._hierarchy) {
      const r = this._getHierarchyProperty(t, n);
      if (rt(r))
        return r;
    }
  }
  setProperty(t, n, s) {
    const r = this.featureCount;
    if (this._checkBatchId(t), U(typeof n == "string", n), this._binaryProperties) {
      const o = this._binaryProperties[n];
      if (o) {
        this._setBinaryProperty(o, t, s);
        return;
      }
    }
    if (this._hierarchy && this._setHierarchyProperty(this, t, n, s))
      return;
    let i = this._properties[n];
    rt(i) || (this._properties[n] = new Array(r), i = this._properties[n]), i[t] = Ye(s);
  }
  _checkBatchId(t) {
    if (!(t >= 0 && t < this.featureCount))
      throw new Error("batchId not in range [0, featureCount - 1].");
  }
  _getBinaryProperty(t, n) {
    return t.unpack(t.typedArray, n);
  }
  _setBinaryProperty(t, n, s) {
    t.pack(s, t.typedArray, n);
  }
  _initializeBinaryProperties() {
    let t = null;
    for (const n in this._properties) {
      const s = this._properties[n], r = this._initializeBinaryProperty(n, s);
      r && (t = t || {}, t[n] = r);
    }
    return t;
  }
  _initializeBinaryProperty(t, n) {
    if ("byteOffset" in n) {
      const s = n;
      U(this.binary, `Property ${t} requires a batch table binary.`), U(s.type, `Property ${t} requires a type.`);
      const r = xd(s, this.binary.buffer, this.binary.byteOffset | 0, this.featureCount);
      return {
        typedArray: r.values,
        componentCount: r.size,
        unpack: r.unpacker,
        pack: r.packer
      };
    }
    return null;
  }
  _hasPropertyInHierarchy(t, n) {
    if (!this._hierarchy)
      return !1;
    const s = Ae(this._hierarchy, t, (r, i) => {
      const o = r.classIds[i], a = r.classes[o].instances;
      return rt(a[n]);
    });
    return rt(s);
  }
  _getPropertyNamesInHierarchy(t, n) {
    Ae(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i].instances;
      for (const a in o)
        o.hasOwnProperty(a) && n.indexOf(a) === -1 && n.push(a);
    });
  }
  _getHierarchyProperty(t, n) {
    return Ae(this._hierarchy, t, (s, r) => {
      const i = s.classIds[r], o = s.classes[i], a = s.classIndexes[r], c = o.instances[n];
      return rt(c) ? rt(c.typedArray) ? this._getBinaryProperty(c, a) : Ye(c[a]) : null;
    });
  }
  _setHierarchyProperty(t, n, s, r) {
    const i = Ae(this._hierarchy, n, (o, a) => {
      const c = o.classIds[a], u = o.classes[c], l = o.classIndexes[a], h = u.instances[s];
      return rt(h) ? (U(a === n, `Inherited property "${s}" is read-only.`), rt(h.typedArray) ? this._setBinaryProperty(h, l, r) : h[l] = Ye(r), !0) : !1;
    });
    return rt(i);
  }
}
const es = 4;
function Rn(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t);
  if (e.magic = s.getUint32(n, !0), n += es, e.version = s.getUint32(n, !0), n += es, e.byteLength = s.getUint32(n, !0), n += es, e.version !== 1)
    throw new Error(`3D Tile Version ${e.version} not supported`);
  return n;
}
const ne = 4, di = "b3dm tile in legacy format.";
function ks(e, t, n) {
  const s = new DataView(t);
  let r;
  e.header = e.header || {};
  let i = s.getUint32(n, !0);
  n += ne;
  let o = s.getUint32(n, !0);
  n += ne;
  let a = s.getUint32(n, !0);
  n += ne;
  let c = s.getUint32(n, !0);
  return n += ne, a >= 570425344 ? (n -= ne * 2, r = i, a = o, c = 0, i = 0, o = 0, console.warn(di)) : c >= 570425344 && (n -= ne, r = a, a = i, c = o, i = 0, o = 0, console.warn(di)), e.header.featureTableJsonByteLength = i, e.header.featureTableBinaryByteLength = o, e.header.batchTableJsonByteLength = a, e.header.batchTableBinaryByteLength = c, e.header.batchLength = r, n;
}
function js(e, t, n, s) {
  return n = Jd(e, t, n), n = Vd(e, t, n), n;
}
function Jd(e, t, n, s) {
  const {
    featureTableJsonByteLength: r,
    featureTableBinaryByteLength: i,
    batchLength: o
  } = e.header || {};
  if (e.featureTableJson = {
    BATCH_LENGTH: o || 0
  }, r && r > 0) {
    const a = ko(t, n, r);
    e.featureTableJson = JSON.parse(a);
  }
  return n += r || 0, e.featureTableBinary = new Uint8Array(t, n, i), n += i || 0, n;
}
function Vd(e, t, n, s) {
  const {
    batchTableJsonByteLength: r,
    batchTableBinaryByteLength: i
  } = e.header || {};
  if (r && r > 0) {
    const o = ko(t, n, r);
    e.batchTableJson = JSON.parse(o), n += r, i && i > 0 && (e.batchTableBinary = new Uint8Array(t, n, i), e.batchTableBinary = new Uint8Array(e.batchTableBinary), n += i);
  }
  return n;
}
function Xo(e, t, n) {
  if (!t && (!e || !e.batchIds || !n))
    return null;
  const {
    batchIds: s,
    isRGB565: r,
    pointCount: i = 0
  } = e;
  if (s && n) {
    const o = new Uint8ClampedArray(i * 3);
    for (let a = 0; a < i; a++) {
      const c = s[a], l = n.getProperty(c, "dimensions").map((h) => h * 255);
      o[a * 3] = l[0], o[a * 3 + 1] = l[1], o[a * 3 + 2] = l[2];
    }
    return {
      type: x.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  if (t && r) {
    const o = new Uint8ClampedArray(i * 3);
    for (let a = 0; a < i; a++) {
      const c = Id(t[a]);
      o[a * 3] = c[0], o[a * 3 + 1] = c[1], o[a * 3 + 2] = c[2];
    }
    return {
      type: x.UNSIGNED_BYTE,
      value: o,
      size: 3,
      normalized: !0
    };
  }
  return t && t.length === i * 3 ? {
    type: x.UNSIGNED_BYTE,
    value: t,
    size: 3,
    normalized: !0
  } : {
    type: x.UNSIGNED_BYTE,
    value: t || new Uint8ClampedArray(),
    size: 4,
    normalized: !0
  };
}
const mi = new m();
function kd(e, t) {
  if (!t)
    return null;
  if (e.isOctEncoded16P) {
    const n = new Float32Array((e.pointsLength || 0) * 3);
    for (let s = 0; s < (e.pointsLength || 0); s++)
      Dd(t[s * 2], t[s * 2 + 1], mi), mi.toArray(n, s * 3);
    return {
      type: x.FLOAT,
      size: 2,
      value: n
    };
  }
  return {
    type: x.FLOAT,
    size: 2,
    value: t
  };
}
function jd(e, t, n) {
  return e.isQuantized ? n["3d-tiles"] && n["3d-tiles"].decodeQuantizedPositions ? (e.isQuantized = !1, Kd(e, t)) : {
    type: x.UNSIGNED_SHORT,
    value: t,
    size: 3,
    normalized: !0
  } : t;
}
function Kd(e, t) {
  const n = new m(), s = new Float32Array(e.pointCount * 3);
  for (let r = 0; r < e.pointCount; r++)
    n.set(t[r * 3], t[r * 3 + 1], t[r * 3 + 2]).scale(1 / e.quantizedRange).multiply(e.quantizedVolumeScale).add(e.quantizedVolumeOffset).toArray(s, r * 3);
  return s;
}
async function zd(e, t, n, s, r) {
  n = Rn(e, t, n), n = ks(e, t, n), n = js(e, t, n), Wd(e);
  const {
    featureTable: i,
    batchTable: o
  } = Xd(e);
  return await Zd(e, i, o, s, r), Qd(e, i, s), qd(e, i, o), Yd(e, i), n;
}
function Wd(e) {
  e.attributes = {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, e.isQuantized = !1, e.isTranslucent = !1, e.isRGB565 = !1, e.isOctEncoded16P = !1;
}
function Xd(e) {
  const t = new Vs(e.featureTableJson, e.featureTableBinary), n = t.getGlobalProperty("POINTS_LENGTH");
  if (!Number.isFinite(n))
    throw new Error("POINTS_LENGTH must be defined");
  t.featuresLength = n, e.featuresLength = n, e.pointsLength = n, e.pointCount = n, e.rtcCenter = t.getGlobalProperty("RTC_CENTER", x.FLOAT, 3);
  const s = $d(e, t);
  return {
    featureTable: t,
    batchTable: s
  };
}
function Qd(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.positions) {
    if (t.hasProperty("POSITION"))
      e.attributes.positions = t.getPropertyArray("POSITION", x.FLOAT, 3);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      const s = t.getPropertyArray("POSITION_QUANTIZED", x.UNSIGNED_SHORT, 3);
      if (e.isQuantized = !0, e.quantizedRange = 65535, e.quantizedVolumeScale = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", x.FLOAT, 3), !e.quantizedVolumeScale)
        throw new Error("QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      if (e.quantizedVolumeOffset = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", x.FLOAT, 3), !e.quantizedVolumeOffset)
        throw new Error("QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      e.attributes.positions = jd(e, s, n);
    }
  }
  if (!e.attributes.positions)
    throw new Error("Either POSITION or POSITION_QUANTIZED must be defined.");
}
function qd(e, t, n) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.colors) {
    let s = null;
    t.hasProperty("RGBA") ? (s = t.getPropertyArray("RGBA", x.UNSIGNED_BYTE, 4), e.isTranslucent = !0) : t.hasProperty("RGB") ? s = t.getPropertyArray("RGB", x.UNSIGNED_BYTE, 3) : t.hasProperty("RGB565") && (s = t.getPropertyArray("RGB565", x.UNSIGNED_SHORT, 1), e.isRGB565 = !0), e.attributes.colors = Xo(e, s, n);
  }
  t.hasProperty("CONSTANT_RGBA") && (e.constantRGBA = t.getGlobalProperty("CONSTANT_RGBA", x.UNSIGNED_BYTE, 4));
}
function Yd(e, t) {
  if (e.attributes = e.attributes || {
    positions: null,
    colors: null,
    normals: null,
    batchIds: null
  }, !e.attributes.normals) {
    let n = null;
    t.hasProperty("NORMAL") ? n = t.getPropertyArray("NORMAL", x.FLOAT, 3) : t.hasProperty("NORMAL_OCT16P") && (n = t.getPropertyArray("NORMAL_OCT16P", x.UNSIGNED_BYTE, 2), e.isOctEncoded16P = !0), e.attributes.normals = kd(e, n);
  }
}
function $d(e, t) {
  let n = null;
  if (!e.batchIds && t.hasProperty("BATCH_ID") && (e.batchIds = t.getPropertyArray("BATCH_ID", x.UNSIGNED_SHORT, 1), e.batchIds)) {
    const s = t.getGlobalProperty("BATCH_LENGTH");
    if (!s)
      throw new Error("Global property: BATCH_LENGTH must be defined when BATCH_ID is defined.");
    const {
      batchTableJson: r,
      batchTableBinary: i
    } = e;
    n = new Wo(r, i, s);
  }
  return n;
}
async function Zd(e, t, n, s, r) {
  let i, o, a;
  const c = e.batchTableJson && e.batchTableJson.extensions && e.batchTableJson.extensions["3DTILES_draco_point_compression"];
  c && (a = c.properties);
  const u = t.getExtension("3DTILES_draco_point_compression");
  if (u) {
    o = u.properties;
    const h = u.byteOffset, f = u.byteLength;
    if (!o || !Number.isFinite(h) || !f)
      throw new Error("Draco properties, byteOffset, and byteLength must be defined");
    i = (e.featureTableBinary || []).slice(h, h + f), e.hasPositions = Number.isFinite(o.POSITION), e.hasColors = Number.isFinite(o.RGB) || Number.isFinite(o.RGBA), e.hasNormals = Number.isFinite(o.NORMAL), e.hasBatchIds = Number.isFinite(o.BATCH_ID), e.isTranslucent = Number.isFinite(o.RGBA);
  }
  if (!i)
    return !0;
  const l = {
    buffer: i,
    properties: {
      ...o,
      ...a
    },
    featureTableProperties: o,
    batchTableProperties: a,
    dequantizeInShader: !1
  };
  return await tm(e, l, s, r);
}
async function tm(e, t, n, s) {
  if (!s)
    return;
  const r = {
    ...n,
    draco: {
      ...n == null ? void 0 : n.draco,
      extraAttributes: t.batchTableProperties || {}
    }
  };
  delete r["3d-tiles"];
  const i = await Re(t.buffer, Ko, r, s), o = i.attributes.POSITION && i.attributes.POSITION.value, a = i.attributes.COLOR_0 && i.attributes.COLOR_0.value, c = i.attributes.NORMAL && i.attributes.NORMAL.value, u = i.attributes.BATCH_ID && i.attributes.BATCH_ID.value, l = o && i.attributes.POSITION.value.quantization, h = c && i.attributes.NORMAL.value.quantization;
  if (l) {
    const d = i.POSITION.data.quantization, A = d.range;
    e.quantizedVolumeScale = new m(A, A, A), e.quantizedVolumeOffset = new m(d.minValues), e.quantizedRange = (1 << d.quantizationBits) - 1, e.isQuantizedDraco = !0;
  }
  h && (e.octEncodedRange = (1 << i.NORMAL.data.quantization.quantizationBits) - 1, e.isOctEncodedDraco = !0);
  const f = {};
  if (t.batchTableProperties)
    for (const d of Object.keys(t.batchTableProperties))
      i.attributes[d] && i.attributes[d].value && (f[d.toLowerCase()] = i.attributes[d].value);
  e.attributes = {
    positions: o,
    colors: Xo(e, a, void 0),
    normals: c,
    batchIds: u,
    ...f
  };
}
const em = "4.1.1";
var ns;
const nm = (ns = globalThis.loaders) === null || ns === void 0 ? void 0 : ns.parseImageNode, Ts = typeof Image < "u", Es = typeof ImageBitmap < "u", sm = !!nm, bs = Cn ? !0 : sm;
function rm(e) {
  switch (e) {
    case "auto":
      return Es || Ts || bs;
    case "imagebitmap":
      return Es;
    case "image":
      return Ts;
    case "data":
      return bs;
    default:
      throw new Error(`@loaders.gl/images: image ${e} not supported in this environment`);
  }
}
function im() {
  if (Es)
    return "imagebitmap";
  if (Ts)
    return "image";
  if (bs)
    return "data";
  throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
}
function om(e) {
  const t = am(e);
  if (!t)
    throw new Error("Not an image");
  return t;
}
function Qo(e) {
  switch (om(e)) {
    case "data":
      return e;
    case "image":
    case "imagebitmap":
      const t = document.createElement("canvas"), n = t.getContext("2d");
      if (!n)
        throw new Error("getImageData");
      return t.width = e.width, t.height = e.height, n.drawImage(e, 0, 0), n.getImageData(0, 0, e.width, e.height);
    default:
      throw new Error("getImageData");
  }
}
function am(e) {
  return typeof ImageBitmap < "u" && e instanceof ImageBitmap ? "imagebitmap" : typeof Image < "u" && e instanceof Image ? "image" : e && typeof e == "object" && e.data && e.width && e.height ? "data" : null;
}
const cm = /^data:image\/svg\+xml/, um = /\.svg((\?|#).*)?$/;
function Ks(e) {
  return e && (cm.test(e) || um.test(e));
}
function lm(e, t) {
  if (Ks(t)) {
    let s = new TextDecoder().decode(e);
    try {
      typeof unescape == "function" && typeof encodeURIComponent == "function" && (s = unescape(encodeURIComponent(s)));
    } catch (i) {
      throw new Error(i.message);
    }
    return `data:image/svg+xml;base64,${btoa(s)}`;
  }
  return qo(e, t);
}
function qo(e, t) {
  if (Ks(t))
    throw new Error("SVG cannot be parsed directly to imagebitmap");
  return new Blob([new Uint8Array(e)]);
}
async function Yo(e, t, n) {
  const s = lm(e, n), r = self.URL || self.webkitURL, i = typeof s != "string" && r.createObjectURL(s);
  try {
    return await hm(i || s, t);
  } finally {
    i && r.revokeObjectURL(i);
  }
}
async function hm(e, t) {
  const n = new Image();
  return n.src = e, t.image && t.image.decode && n.decode ? (await n.decode(), n) : await new Promise((s, r) => {
    try {
      n.onload = () => s(n), n.onerror = (i) => {
        const o = i instanceof Error ? i.message : "error";
        r(new Error(o));
      };
    } catch (i) {
      r(i);
    }
  });
}
const fm = {};
let Ai = !0;
async function dm(e, t, n) {
  let s;
  Ks(n) ? s = await Yo(e, t, n) : s = qo(e, n);
  const r = t && t.imagebitmap;
  return await mm(s, r);
}
async function mm(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if ((Am(t) || !Ai) && (t = null), t)
    try {
      return await createImageBitmap(e, t);
    } catch (n) {
      console.warn(n), Ai = !1;
    }
  return await createImageBitmap(e);
}
function Am(e) {
  for (const t in e || fm)
    return !1;
  return !0;
}
function gm(e) {
  return !Cm(e, "ftyp", 4) || !(e[8] & 96) ? null : pm(e);
}
function pm(e) {
  switch (Bm(e, 8, 12).replace("\0", " ").trim()) {
    case "avif":
    case "avis":
      return {
        extension: "avif",
        mimeType: "image/avif"
      };
    default:
      return null;
  }
}
function Bm(e, t, n) {
  return String.fromCharCode(...e.slice(t, n));
}
function ym(e) {
  return [...e].map((t) => t.charCodeAt(0));
}
function Cm(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = ym(t);
  for (let r = 0; r < s.length; ++r)
    if (s[r] !== e[r + n])
      return !1;
  return !0;
}
const St = !1, Ee = !0;
function zs(e) {
  const t = xe(e);
  return Em(t) || wm(t) || bm(t) || _m(t) || Tm(t);
}
function Tm(e) {
  const t = new Uint8Array(e instanceof DataView ? e.buffer : e), n = gm(t);
  return n ? {
    mimeType: n.mimeType,
    width: 0,
    height: 0
  } : null;
}
function Em(e) {
  const t = xe(e);
  return t.byteLength >= 24 && t.getUint32(0, St) === 2303741511 ? {
    mimeType: "image/png",
    width: t.getUint32(16, St),
    height: t.getUint32(20, St)
  } : null;
}
function bm(e) {
  const t = xe(e);
  return t.byteLength >= 10 && t.getUint32(0, St) === 1195984440 ? {
    mimeType: "image/gif",
    width: t.getUint16(6, Ee),
    height: t.getUint16(8, Ee)
  } : null;
}
function _m(e) {
  const t = xe(e);
  return t.byteLength >= 14 && t.getUint16(0, St) === 16973 && t.getUint32(2, Ee) === t.byteLength ? {
    mimeType: "image/bmp",
    width: t.getUint32(18, Ee),
    height: t.getUint32(22, Ee)
  } : null;
}
function wm(e) {
  const t = xe(e);
  if (!(t.byteLength >= 3 && t.getUint16(0, St) === 65496 && t.getUint8(2) === 255))
    return null;
  const {
    tableMarkers: s,
    sofMarkers: r
  } = Mm();
  let i = 2;
  for (; i + 9 < t.byteLength; ) {
    const o = t.getUint16(i, St);
    if (r.has(o))
      return {
        mimeType: "image/jpeg",
        height: t.getUint16(i + 5, St),
        width: t.getUint16(i + 7, St)
      };
    if (!s.has(o))
      return null;
    i += 2, i += t.getUint16(i, St);
  }
  return null;
}
function Mm() {
  const e = /* @__PURE__ */ new Set([65499, 65476, 65484, 65501, 65534]);
  for (let n = 65504; n < 65520; ++n)
    e.add(n);
  return {
    tableMarkers: e,
    sofMarkers: /* @__PURE__ */ new Set([65472, 65473, 65474, 65475, 65477, 65478, 65479, 65481, 65482, 65483, 65485, 65486, 65487, 65502])
  };
}
function xe(e) {
  if (e instanceof DataView)
    return e;
  if (ArrayBuffer.isView(e))
    return new DataView(e.buffer);
  if (e instanceof ArrayBuffer)
    return new DataView(e);
  throw new Error("toDataView");
}
async function Rm(e, t) {
  var n;
  const {
    mimeType: s
  } = zs(e) || {}, r = (n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode;
  return U(r), await r(e, s);
}
async function Im(e, t, n) {
  t = t || {};
  const r = (t.image || {}).type || "auto", {
    url: i
  } = n || {}, o = Sm(r);
  let a;
  switch (o) {
    case "imagebitmap":
      a = await dm(e, t, i);
      break;
    case "image":
      a = await Yo(e, t, i);
      break;
    case "data":
      a = await Rm(e);
      break;
    default:
      U(!1);
  }
  return r === "data" && (a = Qo(a)), a;
}
function Sm(e) {
  switch (e) {
    case "auto":
    case "data":
      return im();
    default:
      return rm(e), e;
  }
}
const Dm = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "svg", "avif"], Fm = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/avif", "image/bmp", "image/vnd.microsoft.icon", "image/svg+xml"], Om = {
  image: {
    type: "auto",
    decode: !0
  }
}, vm = {
  id: "image",
  module: "images",
  name: "Images",
  version: em,
  mimeTypes: Fm,
  extensions: Dm,
  parse: Im,
  tests: [(e) => !!zs(new DataView(e))],
  options: Om
}, ss = {};
function xm(e) {
  if (ss[e] === void 0) {
    const t = Cn ? Gm(e) : Lm(e);
    ss[e] = t;
  }
  return ss[e];
}
function Lm(e) {
  var t, n;
  const s = ["image/png", "image/jpeg", "image/gif"], r = ((t = globalThis.loaders) === null || t === void 0 ? void 0 : t.imageFormatsNode) || s;
  return !!((n = globalThis.loaders) === null || n === void 0 ? void 0 : n.parseImageNode) && r.includes(e);
}
function Gm(e) {
  switch (e) {
    case "image/avif":
    case "image/webp":
      return Um(e);
    default:
      return !0;
  }
}
function Um(e) {
  try {
    return document.createElement("canvas").toDataURL(e).indexOf(`data:${e}`) === 0;
  } catch {
    return !1;
  }
}
function ft(e, t) {
  if (!e)
    throw new Error(t || "assert failed: gltf");
}
const $o = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Zo = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, Pm = 1.33, gi = ["SCALAR", "VEC2", "VEC3", "VEC4"], Nm = [[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126], [Float64Array, 5130]], Hm = new Map(Nm), Jm = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Vm = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, km = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
function ta(e) {
  return gi[e - 1] || gi[0];
}
function Ws(e) {
  const t = Hm.get(e.constructor);
  if (!t)
    throw new Error("Illegal typed array");
  return t;
}
function Xs(e, t) {
  const n = km[e.componentType], s = Jm[e.type], r = Vm[e.componentType], i = e.count * s, o = e.count * s * r;
  ft(o >= 0 && o <= t.byteLength);
  const a = Zo[e.componentType], c = $o[e.type];
  return {
    ArrayType: n,
    length: i,
    byteLength: o,
    componentByteSize: a,
    numberOfComponentsInElement: c
  };
}
function ea(e) {
  let {
    images: t,
    bufferViews: n
  } = e;
  t = t || [], n = n || [];
  const s = t.map((o) => o.bufferView);
  n = n.filter((o) => !s.includes(o));
  const r = n.reduce((o, a) => o + a.byteLength, 0), i = t.reduce((o, a) => {
    const {
      width: c,
      height: u
    } = a.image;
    return o + c * u;
  }, 0);
  return r + Math.ceil(4 * i * Pm);
}
function jm(e, t, n) {
  const s = e.bufferViews[n];
  ft(s);
  const r = s.buffer, i = t[r];
  ft(i);
  const o = (s.byteOffset || 0) + i.byteOffset;
  return new Uint8Array(i.arrayBuffer, o, s.byteLength);
}
function Km(e, t, n) {
  var s, r;
  const i = typeof n == "number" ? (s = e.accessors) === null || s === void 0 ? void 0 : s[n] : n;
  if (!i)
    throw new Error(`No gltf accessor ${JSON.stringify(n)}`);
  const o = (r = e.bufferViews) === null || r === void 0 ? void 0 : r[i.bufferView || 0];
  if (!o)
    throw new Error(`No gltf buffer view for accessor ${o}`);
  const {
    arrayBuffer: a,
    byteOffset: c
  } = t[o.buffer], u = (c || 0) + (i.byteOffset || 0) + (o.byteOffset || 0), {
    ArrayType: l,
    length: h,
    componentByteSize: f,
    numberOfComponentsInElement: d
  } = Xs(i, o), A = f * d, g = o.byteStride || A;
  if (typeof o.byteStride > "u" || o.byteStride === A)
    return new l(a, u, h);
  const p = new l(h);
  for (let y = 0; y < i.count; y++) {
    const _ = new l(a, u + y * g, d);
    p.set(_, y * d);
  }
  return p;
}
function zm() {
  return {
    asset: {
      version: "2.0",
      generator: "loaders.gl"
    },
    buffers: [],
    extensions: {},
    extensionsRequired: [],
    extensionsUsed: []
  };
}
class tt {
  constructor(t) {
    this.gltf = void 0, this.sourceBuffers = void 0, this.byteLength = void 0, this.gltf = {
      json: (t == null ? void 0 : t.json) || zm(),
      buffers: (t == null ? void 0 : t.buffers) || [],
      images: (t == null ? void 0 : t.images) || []
    }, this.sourceBuffers = [], this.byteLength = 0, this.gltf.buffers && this.gltf.buffers[0] && (this.byteLength = this.gltf.buffers[0].byteLength, this.sourceBuffers = [this.gltf.buffers[0]]);
  }
  get json() {
    return this.gltf.json;
  }
  getApplicationData(t) {
    return this.json[t];
  }
  getExtraData(t) {
    return (this.json.extras || {})[t];
  }
  hasExtension(t) {
    const n = this.getUsedExtensions().find((r) => r === t), s = this.getRequiredExtensions().find((r) => r === t);
    return typeof n == "string" || typeof s == "string";
  }
  getExtension(t) {
    const n = this.getUsedExtensions().find((r) => r === t), s = this.json.extensions || {};
    return n ? s[t] : null;
  }
  getRequiredExtension(t) {
    return this.getRequiredExtensions().find((s) => s === t) ? this.getExtension(t) : null;
  }
  getRequiredExtensions() {
    return this.json.extensionsRequired || [];
  }
  getUsedExtensions() {
    return this.json.extensionsUsed || [];
  }
  getRemovedExtensions() {
    return this.json.extensionsRemoved || [];
  }
  getObjectExtension(t, n) {
    return (t.extensions || {})[n];
  }
  getScene(t) {
    return this.getObject("scenes", t);
  }
  getNode(t) {
    return this.getObject("nodes", t);
  }
  getSkin(t) {
    return this.getObject("skins", t);
  }
  getMesh(t) {
    return this.getObject("meshes", t);
  }
  getMaterial(t) {
    return this.getObject("materials", t);
  }
  getAccessor(t) {
    return this.getObject("accessors", t);
  }
  getTexture(t) {
    return this.getObject("textures", t);
  }
  getSampler(t) {
    return this.getObject("samplers", t);
  }
  getImage(t) {
    return this.getObject("images", t);
  }
  getBufferView(t) {
    return this.getObject("bufferViews", t);
  }
  getBuffer(t) {
    return this.getObject("buffers", t);
  }
  getObject(t, n) {
    if (typeof n == "object")
      return n;
    const s = this.json[t] && this.json[t][n];
    if (!s)
      throw new Error(`glTF file error: Could not find ${t}[${n}]`);
    return s;
  }
  getTypedArrayForBufferView(t) {
    t = this.getBufferView(t);
    const n = t.buffer, s = this.gltf.buffers[n];
    ft(s);
    const r = (t.byteOffset || 0) + s.byteOffset;
    return new Uint8Array(s.arrayBuffer, r, t.byteLength);
  }
  getTypedArrayForAccessor(t) {
    const n = this.getAccessor(t);
    return Km(this.gltf.json, this.gltf.buffers, n);
  }
  getTypedArrayForImageData(t) {
    t = this.getAccessor(t);
    const n = this.getBufferView(t.bufferView), r = this.getBuffer(n.buffer).data, i = n.byteOffset || 0;
    return new Uint8Array(r, i, n.byteLength);
  }
  addApplicationData(t, n) {
    return this.json[t] = n, this;
  }
  addExtraData(t, n) {
    return this.json.extras = this.json.extras || {}, this.json.extras[t] = n, this;
  }
  addObjectExtension(t, n, s) {
    return t.extensions = t.extensions || {}, t.extensions[n] = s, this.registerUsedExtension(n), this;
  }
  setObjectExtension(t, n, s) {
    const r = t.extensions || {};
    r[n] = s;
  }
  removeObjectExtension(t, n) {
    const s = (t == null ? void 0 : t.extensions) || {};
    if (s[n]) {
      this.json.extensionsRemoved = this.json.extensionsRemoved || [];
      const r = this.json.extensionsRemoved;
      r.includes(n) || r.push(n);
    }
    delete s[n];
  }
  addExtension(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return ft(n), this.json.extensions = this.json.extensions || {}, this.json.extensions[t] = n, this.registerUsedExtension(t), n;
  }
  addRequiredExtension(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return ft(n), this.addExtension(t, n), this.registerRequiredExtension(t), n;
  }
  registerUsedExtension(t) {
    this.json.extensionsUsed = this.json.extensionsUsed || [], this.json.extensionsUsed.find((n) => n === t) || this.json.extensionsUsed.push(t);
  }
  registerRequiredExtension(t) {
    this.registerUsedExtension(t), this.json.extensionsRequired = this.json.extensionsRequired || [], this.json.extensionsRequired.find((n) => n === t) || this.json.extensionsRequired.push(t);
  }
  removeExtension(t) {
    var n;
    if ((n = this.json.extensions) !== null && n !== void 0 && n[t]) {
      this.json.extensionsRemoved = this.json.extensionsRemoved || [];
      const s = this.json.extensionsRemoved;
      s.includes(t) || s.push(t);
    }
    this.json.extensions && delete this.json.extensions[t], this.json.extensionsRequired && this._removeStringFromArray(this.json.extensionsRequired, t), this.json.extensionsUsed && this._removeStringFromArray(this.json.extensionsUsed, t);
  }
  setDefaultScene(t) {
    this.json.scene = t;
  }
  addScene(t) {
    const {
      nodeIndices: n
    } = t;
    return this.json.scenes = this.json.scenes || [], this.json.scenes.push({
      nodes: n
    }), this.json.scenes.length - 1;
  }
  addNode(t) {
    const {
      meshIndex: n,
      matrix: s
    } = t;
    this.json.nodes = this.json.nodes || [];
    const r = {
      mesh: n
    };
    return s && (r.matrix = s), this.json.nodes.push(r), this.json.nodes.length - 1;
  }
  addMesh(t) {
    const {
      attributes: n,
      indices: s,
      material: r,
      mode: i = 4
    } = t, a = {
      primitives: [{
        attributes: this._addAttributes(n),
        mode: i
      }]
    };
    if (s) {
      const c = this._addIndices(s);
      a.primitives[0].indices = c;
    }
    return Number.isFinite(r) && (a.primitives[0].material = r), this.json.meshes = this.json.meshes || [], this.json.meshes.push(a), this.json.meshes.length - 1;
  }
  addPointCloud(t) {
    const s = {
      primitives: [{
        attributes: this._addAttributes(t),
        mode: 0
      }]
    };
    return this.json.meshes = this.json.meshes || [], this.json.meshes.push(s), this.json.meshes.length - 1;
  }
  addImage(t, n) {
    const s = zs(t), r = n || (s == null ? void 0 : s.mimeType), o = {
      bufferView: this.addBufferView(t),
      mimeType: r
    };
    return this.json.images = this.json.images || [], this.json.images.push(o), this.json.images.length - 1;
  }
  addBufferView(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : this.byteLength;
    const r = t.byteLength;
    ft(Number.isFinite(r)), this.sourceBuffers = this.sourceBuffers || [], this.sourceBuffers.push(t);
    const i = {
      buffer: n,
      byteOffset: s,
      byteLength: r
    };
    return this.byteLength += Ie(r, 4), this.json.bufferViews = this.json.bufferViews || [], this.json.bufferViews.push(i), this.json.bufferViews.length - 1;
  }
  addAccessor(t, n) {
    const s = {
      bufferView: t,
      type: ta(n.size),
      componentType: n.componentType,
      count: n.count,
      max: n.max,
      min: n.min
    };
    return this.json.accessors = this.json.accessors || [], this.json.accessors.push(s), this.json.accessors.length - 1;
  }
  addBinaryBuffer(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      size: 3
    };
    const s = this.addBufferView(t);
    let r = {
      min: n.min,
      max: n.max
    };
    (!r.min || !r.max) && (r = this._getAccessorMinMax(t, n.size));
    const i = {
      size: n.size,
      componentType: Ws(t),
      count: Math.round(t.length / n.size),
      min: r.min,
      max: r.max
    };
    return this.addAccessor(s, Object.assign(i, n));
  }
  addTexture(t) {
    const {
      imageIndex: n
    } = t, s = {
      source: n
    };
    return this.json.textures = this.json.textures || [], this.json.textures.push(s), this.json.textures.length - 1;
  }
  addMaterial(t) {
    return this.json.materials = this.json.materials || [], this.json.materials.push(t), this.json.materials.length - 1;
  }
  createBinaryChunk() {
    var t, n;
    this.gltf.buffers = [];
    const s = this.byteLength, r = new ArrayBuffer(s), i = new Uint8Array(r);
    let o = 0;
    for (const a of this.sourceBuffers || [])
      o = vc(a, i, o);
    (t = this.json) !== null && t !== void 0 && (n = t.buffers) !== null && n !== void 0 && n[0] ? this.json.buffers[0].byteLength = s : this.json.buffers = [{
      byteLength: s
    }], this.gltf.binary = r, this.sourceBuffers = [r];
  }
  _removeStringFromArray(t, n) {
    let s = !0;
    for (; s; ) {
      const r = t.indexOf(n);
      r > -1 ? t.splice(r, 1) : s = !1;
    }
  }
  _addAttributes() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const n = {};
    for (const s in t) {
      const r = t[s], i = this._getGltfAttributeName(s), o = this.addBinaryBuffer(r.value, r);
      n[i] = o;
    }
    return n;
  }
  _addIndices(t) {
    return this.addBinaryBuffer(t, {
      size: 1
    });
  }
  _getGltfAttributeName(t) {
    switch (t.toLowerCase()) {
      case "position":
      case "positions":
      case "vertices":
        return "POSITION";
      case "normal":
      case "normals":
        return "NORMAL";
      case "color":
      case "colors":
        return "COLOR_0";
      case "texcoord":
      case "texcoords":
        return "TEXCOORD_0";
      default:
        return t;
    }
  }
  _getAccessorMinMax(t, n) {
    const s = {
      min: null,
      max: null
    };
    if (t.length < n)
      return s;
    s.min = [], s.max = [];
    const r = t.subarray(0, n);
    for (const i of r)
      s.min.push(i), s.max.push(i);
    for (let i = n; i < t.length; i += n)
      for (let o = 0; o < n; o++)
        s.min[0 + o] = Math.min(s.min[0 + o], t[i + o]), s.max[0 + o] = Math.max(s.max[0 + o], t[i + o]);
    return s;
  }
}
function pi(e) {
  return (e % 1 + 1) % 1;
}
const na = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16,
  BOOLEAN: 1,
  STRING: 1,
  ENUM: 1
}, Wm = {
  INT8: Int8Array,
  UINT8: Uint8Array,
  INT16: Int16Array,
  UINT16: Uint16Array,
  INT32: Int32Array,
  UINT32: Uint32Array,
  INT64: BigInt64Array,
  UINT64: BigUint64Array,
  FLOAT32: Float32Array,
  FLOAT64: Float64Array
}, sa = {
  INT8: 1,
  UINT8: 1,
  INT16: 2,
  UINT16: 2,
  INT32: 4,
  UINT32: 4,
  INT64: 8,
  UINT64: 8,
  FLOAT32: 4,
  FLOAT64: 8
};
function Qs(e, t) {
  return sa[t] * na[e];
}
function In(e, t, n, s) {
  if (n !== "UINT8" && n !== "UINT16" && n !== "UINT32" && n !== "UINT64")
    return null;
  const r = e.getTypedArrayForBufferView(t), i = Sn(r, "SCALAR", n, s + 1);
  return i instanceof BigInt64Array || i instanceof BigUint64Array ? null : i;
}
function Sn(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = na[t], i = Wm[n], o = sa[n], a = s * r, c = a * o;
  let u = e.buffer, l = e.byteOffset;
  return l % o !== 0 && (u = new Uint8Array(u).slice(l, l + c).buffer, l = 0), new i(u, l, a);
}
function qs(e, t, n) {
  var s, r;
  const i = `TEXCOORD_${t.texCoord || 0}`, o = n.attributes[i], a = e.getTypedArrayForAccessor(o), c = e.gltf.json, u = t.index, l = (s = c.textures) === null || s === void 0 || (r = s[u]) === null || r === void 0 ? void 0 : r.source;
  if (typeof l < "u") {
    var h, f, d;
    const A = (h = c.images) === null || h === void 0 || (f = h[l]) === null || f === void 0 ? void 0 : f.mimeType, g = (d = e.gltf.images) === null || d === void 0 ? void 0 : d[l];
    if (g && typeof g.width < "u") {
      const p = [];
      for (let y = 0; y < a.length; y += 2) {
        const _ = Xm(g, A, a, y, t.channels);
        p.push(_);
      }
      return p;
    }
  }
  return [];
}
function ra(e, t, n, s, r) {
  if (!(n != null && n.length))
    return;
  const i = [];
  for (const l of n) {
    let h = s.findIndex((f) => f === l);
    h === -1 && (h = s.push(l) - 1), i.push(h);
  }
  const o = new Uint32Array(i), a = e.gltf.buffers.push({
    arrayBuffer: o.buffer,
    byteOffset: o.byteOffset,
    byteLength: o.byteLength
  }) - 1, c = e.addBufferView(o, a, 0), u = e.addAccessor(c, {
    size: 1,
    componentType: Ws(o),
    count: o.length
  });
  r.attributes[t] = u;
}
function Xm(e, t, n, s) {
  let r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [0];
  const i = {
    r: {
      offset: 0,
      shift: 0
    },
    g: {
      offset: 1,
      shift: 8
    },
    b: {
      offset: 2,
      shift: 16
    },
    a: {
      offset: 3,
      shift: 24
    }
  }, o = n[s], a = n[s + 1];
  let c = 1;
  t && (t.indexOf("image/jpeg") !== -1 || t.indexOf("image/png") !== -1) && (c = 4);
  const u = Qm(o, a, e, c);
  let l = 0;
  for (const h of r) {
    const f = typeof h == "number" ? Object.values(i)[h] : i[h], d = u + f.offset, A = Qo(e);
    if (A.data.length <= d)
      throw new Error(`${A.data.length} <= ${d}`);
    const g = A.data[d];
    l |= g << f.shift;
  }
  return l;
}
function Qm(e, t, n) {
  let s = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
  const r = n.width, i = pi(e) * (r - 1), o = Math.round(i), a = n.height, c = pi(t) * (a - 1), u = Math.round(c), l = n.components ? n.components : s;
  return (u * r + o) * l;
}
function ia(e, t, n, s, r) {
  const i = [];
  for (let o = 0; o < t; o++) {
    const a = n[o], c = n[o + 1] - n[o];
    if (c + a > s)
      break;
    const u = a / r, l = c / r;
    i.push(e.slice(u, u + l));
  }
  return i;
}
function oa(e, t, n) {
  const s = [];
  for (let r = 0; r < t; r++) {
    const i = r * n;
    s.push(e.slice(i, i + n));
  }
  return s;
}
function aa(e, t, n, s) {
  if (n)
    throw new Error("Not implemented - arrayOffsets for strings is specified");
  if (s) {
    const r = [], i = new TextDecoder("utf8");
    let o = 0;
    for (let a = 0; a < e; a++) {
      const c = s[a + 1] - s[a];
      if (c + o <= t.length) {
        const u = t.subarray(o, c + o), l = i.decode(u);
        r.push(l), o += c;
      }
    }
    return r;
  }
  return [];
}
const ca = "EXT_mesh_features", qm = ca;
async function Ym(e, t) {
  const n = new tt(e);
  $m(n, t);
}
function $m(e, t) {
  const n = e.gltf.json;
  if (n.meshes)
    for (const s of n.meshes)
      for (const r of s.primitives)
        Zm(e, r, t);
}
function Zm(e, t, n) {
  var s, r;
  if (!(n != null && (s = n.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = (r = t.extensions) === null || r === void 0 ? void 0 : r[ca], o = i == null ? void 0 : i.featureIds;
  if (o)
    for (const c of o) {
      var a;
      let u;
      if (typeof c.attribute < "u") {
        const l = `_FEATURE_ID_${c.attribute}`, h = t.attributes[l];
        u = e.getTypedArrayForAccessor(h);
      } else
        typeof c.texture < "u" && n !== null && n !== void 0 && (a = n.gltf) !== null && a !== void 0 && a.loadImages ? u = qs(e, c.texture, t) : u = [];
      c.data = u;
    }
}
const tA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Ym,
  name: qm
}, Symbol.toStringTag, { value: "Module" })), Ys = "EXT_structural_metadata", eA = Ys;
async function nA(e, t) {
  const n = new tt(e);
  sA(n, t);
}
function sA(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(Ys);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && rA(e, r), iA(e, r));
}
function rA(e, t) {
  const n = t.propertyTextures, s = e.gltf.json;
  if (n && s.meshes)
    for (const r of s.meshes)
      for (const i of r.primitives)
        aA(e, n, i, t);
}
function iA(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.propertyTables;
  if (s && r)
    for (const i in s) {
      const o = oA(r, i);
      o && uA(e, n, o);
    }
}
function oA(e, t) {
  for (const n of e)
    if (n.class === t)
      return n;
  return null;
}
function aA(e, t, n, s) {
  var r;
  if (!t)
    return;
  const i = (r = n.extensions) === null || r === void 0 ? void 0 : r[Ys], o = i == null ? void 0 : i.propertyTextures;
  if (o)
    for (const a of o) {
      const c = t[a];
      cA(e, c, n, s);
    }
}
function cA(e, t, n, s) {
  if (!t.properties)
    return;
  s.dataAttributeNames || (s.dataAttributeNames = []);
  const r = t.class;
  for (const o in t.properties) {
    var i;
    const a = `${r}_${o}`, c = (i = t.properties) === null || i === void 0 ? void 0 : i[o];
    if (!c)
      continue;
    c.data || (c.data = []);
    const u = c.data, l = qs(e, c, n);
    l !== null && (ra(e, a, l, u, n), c.data = u, s.dataAttributeNames.push(a));
  }
}
function uA(e, t, n) {
  var s;
  const r = (s = t.classes) === null || s === void 0 ? void 0 : s[n.class];
  if (!r)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);
  const i = n.count;
  for (const a in r.properties) {
    var o;
    const c = r.properties[a], u = (o = n.properties) === null || o === void 0 ? void 0 : o[a];
    if (u) {
      const l = lA(e, t, c, i, u);
      u.data = l;
    }
  }
}
function lA(e, t, n, s, r) {
  let i = [];
  const o = r.values, a = e.getTypedArrayForBufferView(o), c = hA(e, n, r, s), u = fA(e, r, s);
  switch (n.type) {
    case "SCALAR":
    case "VEC2":
    case "VEC3":
    case "VEC4":
    case "MAT2":
    case "MAT3":
    case "MAT4": {
      i = dA(n, s, a, c);
      break;
    }
    case "BOOLEAN":
      throw new Error(`Not implemented - classProperty.type=${n.type}`);
    case "STRING": {
      i = aa(s, a, c, u);
      break;
    }
    case "ENUM": {
      i = mA(t, n, s, a, c);
      break;
    }
    default:
      throw new Error(`Unknown classProperty type ${n.type}`);
  }
  return i;
}
function hA(e, t, n, s) {
  return t.array && typeof t.count > "u" && typeof n.arrayOffsets < "u" ? In(e, n.arrayOffsets, n.arrayOffsetType || "UINT32", s) : null;
}
function fA(e, t, n) {
  return typeof t.stringOffsets < "u" ? In(e, t.stringOffsets, t.stringOffsetType || "UINT32", n) : null;
}
function dA(e, t, n, s) {
  const r = e.array, i = e.count, o = Qs(e.type, e.componentType), a = n.byteLength / o;
  let c;
  return e.componentType ? c = Sn(n, e.type, e.componentType, a) : c = n, r ? s ? ia(c, t, s, n.length, o) : i ? oa(c, t, i) : [] : c;
}
function mA(e, t, n, s, r) {
  var i;
  const o = t.enumType;
  if (!o)
    throw new Error("Incorrect data in the EXT_structural_metadata extension: classProperty.enumType is not set for type ENUM");
  const a = (i = e.enums) === null || i === void 0 ? void 0 : i[o];
  if (!a)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: schema.enums does't contain ${o}`);
  const c = a.valueType || "UINT16", u = Qs(t.type, c), l = s.byteLength / u;
  let h = Sn(s, t.type, c, l);
  if (h || (h = s), t.array) {
    if (r)
      return AA({
        valuesData: h,
        numberOfElements: n,
        arrayOffsets: r,
        valuesDataBytesLength: s.length,
        elementSize: u,
        enumEntry: a
      });
    const f = t.count;
    return f ? gA(h, n, f, a) : [];
  }
  return $s(h, 0, n, a);
}
function AA(e) {
  const {
    valuesData: t,
    numberOfElements: n,
    arrayOffsets: s,
    valuesDataBytesLength: r,
    elementSize: i,
    enumEntry: o
  } = e, a = [];
  for (let c = 0; c < n; c++) {
    const u = s[c], l = s[c + 1] - s[c];
    if (l + u > r)
      break;
    const h = u / i, f = l / i, d = $s(t, h, f, o);
    a.push(d);
  }
  return a;
}
function gA(e, t, n, s) {
  const r = [];
  for (let i = 0; i < t; i++) {
    const o = n * i, a = $s(e, o, n, s);
    r.push(a);
  }
  return r;
}
function $s(e, t, n, s) {
  const r = [];
  for (let i = 0; i < n; i++)
    if (e instanceof BigInt64Array || e instanceof BigUint64Array)
      r.push("");
    else {
      const o = e[t + i], a = pA(s, o);
      a ? r.push(a.name) : r.push("");
    }
  return r;
}
function pA(e, t) {
  for (const n of e.values)
    if (n.value === t)
      return n;
  return null;
}
const BA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: nA,
  name: eA
}, Symbol.toStringTag, { value: "Module" })), ua = "EXT_feature_metadata", yA = ua;
async function CA(e, t) {
  const n = new tt(e);
  TA(n, t);
}
function TA(e, t) {
  var n, s;
  if (!((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const r = e.getExtension(ua);
  r && ((s = t.gltf) !== null && s !== void 0 && s.loadImages && EA(e, r), bA(e, r));
}
function EA(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, {
    featureTextures: r
  } = t;
  if (s && r)
    for (const i in s) {
      const o = s[i], a = wA(r, i);
      a && RA(e, a, o);
    }
}
function bA(e, t) {
  const n = t.schema;
  if (!n)
    return;
  const s = n.classes, r = t.featureTables;
  if (s && r)
    for (const i in s) {
      const o = _A(r, i);
      o && MA(e, n, o);
    }
}
function _A(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function wA(e, t) {
  for (const n in e) {
    const s = e[n];
    if (s.class === t)
      return s;
  }
  return null;
}
function MA(e, t, n) {
  var s;
  if (!n.class)
    return;
  const r = (s = t.classes) === null || s === void 0 ? void 0 : s[n.class];
  if (!r)
    throw new Error(`Incorrect data in the EXT_structural_metadata extension: no schema class with name ${n.class}`);
  const i = n.count;
  for (const a in r.properties) {
    var o;
    const c = r.properties[a], u = (o = n.properties) === null || o === void 0 ? void 0 : o[a];
    if (u) {
      const l = IA(e, t, c, i, u);
      u.data = l;
    }
  }
}
function RA(e, t, n) {
  const s = t.class;
  for (const i in n.properties) {
    var r;
    const o = t == null || (r = t.properties) === null || r === void 0 ? void 0 : r[i];
    if (o) {
      const a = vA(e, o, s);
      o.data = a;
    }
  }
}
function IA(e, t, n, s, r) {
  let i = [];
  const o = r.bufferView, a = e.getTypedArrayForBufferView(o), c = SA(e, n, r, s), u = DA(e, n, r, s);
  return n.type === "STRING" || n.componentType === "STRING" ? i = aa(s, a, c, u) : FA(n) && (i = OA(n, s, a, c)), i;
}
function SA(e, t, n, s) {
  return t.type === "ARRAY" && typeof t.componentCount > "u" && typeof n.arrayOffsetBufferView < "u" ? In(e, n.arrayOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function DA(e, t, n, s) {
  return typeof n.stringOffsetBufferView < "u" ? In(e, n.stringOffsetBufferView, n.offsetType || "UINT32", s) : null;
}
function FA(e) {
  const t = ["UINT8", "INT16", "UINT16", "INT32", "UINT32", "INT64", "UINT64", "FLOAT32", "FLOAT64"];
  return t.includes(e.type) || typeof e.componentType < "u" && t.includes(e.componentType);
}
function OA(e, t, n, s) {
  const r = e.type === "ARRAY", i = e.componentCount, o = "SCALAR", a = e.componentType || e.type, c = Qs(o, a), u = n.byteLength / c, l = Sn(n, o, a, u);
  return r ? s ? ia(l, t, s, n.length, c) : i ? oa(l, t, i) : [] : l;
}
function vA(e, t, n) {
  const s = e.gltf.json;
  if (!s.meshes)
    return [];
  const r = [];
  for (const i of s.meshes)
    for (const o of i.primitives)
      xA(e, n, t, r, o);
  return r;
}
function xA(e, t, n, s, r) {
  const i = {
    channels: n.channels,
    ...n.texture
  }, o = qs(e, i, r);
  o && ra(e, t, o, s, r);
}
const LA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: CA,
  name: yA
}, Symbol.toStringTag, { value: "Module" })), GA = "4.1.1", UA = "4.1.1", mn = {
  TRANSCODER: "basis_transcoder.js",
  TRANSCODER_WASM: "basis_transcoder.wasm",
  ENCODER: "basis_encoder.js",
  ENCODER_WASM: "basis_encoder.wasm"
};
let rs;
async function Bi(e) {
  const t = e.modules || {};
  return t.basis ? t.basis : (rs = rs || PA(e), await rs);
}
async function PA(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await zt(mn.TRANSCODER, "textures", e), await zt(mn.TRANSCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await NA(t, n);
}
function NA(e, t) {
  const n = {};
  return t && (n.wasmBinary = t), new Promise((s) => {
    e(n).then((r) => {
      const {
        BasisFile: i,
        initializeBasis: o
      } = r;
      o(), s({
        BasisFile: i
      });
    });
  });
}
let is;
async function yi(e) {
  const t = e.modules || {};
  return t.basisEncoder ? t.basisEncoder : (is = is || HA(e), await is);
}
async function HA(e) {
  let t = null, n = null;
  return [t, n] = await Promise.all([await zt(mn.ENCODER, "textures", e), await zt(mn.ENCODER_WASM, "textures", e)]), t = t || globalThis.BASIS, await JA(t, n);
}
function JA(e, t) {
  const n = {};
  return t && (n.wasmBinary = t), new Promise((s) => {
    e(n).then((r) => {
      const {
        BasisFile: i,
        KTX2File: o,
        initializeBasis: a,
        BasisEncoder: c
      } = r;
      a(), s({
        BasisFile: i,
        KTX2File: o,
        BasisEncoder: c
      });
    });
  });
}
const se = {
  COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
  COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
  COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
  COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
  COMPRESSED_R11_EAC: 37488,
  COMPRESSED_SIGNED_R11_EAC: 37489,
  COMPRESSED_RG11_EAC: 37490,
  COMPRESSED_SIGNED_RG11_EAC: 37491,
  COMPRESSED_RGB8_ETC2: 37492,
  COMPRESSED_RGBA8_ETC2_EAC: 37493,
  COMPRESSED_SRGB8_ETC2: 37494,
  COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37495,
  COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37496,
  COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37497,
  COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
  COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
  COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
  COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
  COMPRESSED_RGB_ETC1_WEBGL: 36196,
  COMPRESSED_RGB_ATC_WEBGL: 35986,
  COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: 35987,
  COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: 34798,
  COMPRESSED_RGBA_ASTC_4X4_KHR: 37808,
  COMPRESSED_RGBA_ASTC_5X4_KHR: 37809,
  COMPRESSED_RGBA_ASTC_5X5_KHR: 37810,
  COMPRESSED_RGBA_ASTC_6X5_KHR: 37811,
  COMPRESSED_RGBA_ASTC_6X6_KHR: 37812,
  COMPRESSED_RGBA_ASTC_8X5_KHR: 37813,
  COMPRESSED_RGBA_ASTC_8X6_KHR: 37814,
  COMPRESSED_RGBA_ASTC_8X8_KHR: 37815,
  COMPRESSED_RGBA_ASTC_10X5_KHR: 37816,
  COMPRESSED_RGBA_ASTC_10X6_KHR: 37817,
  COMPRESSED_RGBA_ASTC_10X8_KHR: 37818,
  COMPRESSED_RGBA_ASTC_10X10_KHR: 37819,
  COMPRESSED_RGBA_ASTC_12X10_KHR: 37820,
  COMPRESSED_RGBA_ASTC_12X12_KHR: 37821,
  COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR: 37840,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR: 37841,
  COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR: 37842,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR: 37843,
  COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR: 37844,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR: 37845,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR: 37846,
  COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR: 37847,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR: 37848,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR: 37849,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR: 37850,
  COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR: 37851,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR: 37852,
  COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR: 37853,
  COMPRESSED_RED_RGTC1_EXT: 36283,
  COMPRESSED_SIGNED_RED_RGTC1_EXT: 36284,
  COMPRESSED_RED_GREEN_RGTC2_EXT: 36285,
  COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT: 36286,
  COMPRESSED_SRGB_S3TC_DXT1_EXT: 35916,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: 35917,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: 35918,
  COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: 35919
}, VA = ["", "WEBKIT_", "MOZ_"], Ci = {
  WEBGL_compressed_texture_s3tc: "dxt",
  WEBGL_compressed_texture_s3tc_srgb: "dxt-srgb",
  WEBGL_compressed_texture_etc1: "etc1",
  WEBGL_compressed_texture_etc: "etc2",
  WEBGL_compressed_texture_pvrtc: "pvrtc",
  WEBGL_compressed_texture_atc: "atc",
  WEBGL_compressed_texture_astc: "astc",
  EXT_texture_compression_rgtc: "rgtc"
};
let $e = null;
function kA(e) {
  if (!$e) {
    e = e || jA() || void 0, $e = /* @__PURE__ */ new Set();
    for (const t of VA)
      for (const n in Ci)
        if (e && e.getExtension(`${t}${n}`)) {
          const s = Ci[n];
          $e.add(s);
        }
  }
  return $e;
}
function jA() {
  try {
    return document.createElement("canvas").getContext("webgl");
  } catch {
    return null;
  }
}
var Ti, Ei, bi, _i, wi, Mi, Ri, Ii;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.BASISLZ = 1] = "BASISLZ", e[e.ZSTD = 2] = "ZSTD", e[e.ZLIB = 3] = "ZLIB";
})(Ti || (Ti = {})), function(e) {
  e[e.BASICFORMAT = 0] = "BASICFORMAT";
}(Ei || (Ei = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.ETC1S = 163] = "ETC1S", e[e.UASTC = 166] = "UASTC";
}(bi || (bi = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.SRGB = 1] = "SRGB";
}(_i || (_i = {})), function(e) {
  e[e.UNSPECIFIED = 0] = "UNSPECIFIED", e[e.LINEAR = 1] = "LINEAR", e[e.SRGB = 2] = "SRGB", e[e.ITU = 3] = "ITU", e[e.NTSC = 4] = "NTSC", e[e.SLOG = 5] = "SLOG", e[e.SLOG2 = 6] = "SLOG2";
}(wi || (wi = {})), function(e) {
  e[e.ALPHA_STRAIGHT = 0] = "ALPHA_STRAIGHT", e[e.ALPHA_PREMULTIPLIED = 1] = "ALPHA_PREMULTIPLIED";
}(Mi || (Mi = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RRR = 3] = "RRR", e[e.GGG = 4] = "GGG", e[e.AAA = 15] = "AAA";
}(Ri || (Ri = {})), function(e) {
  e[e.RGB = 0] = "RGB", e[e.RGBA = 3] = "RGBA", e[e.RRR = 4] = "RRR", e[e.RRRG = 5] = "RRRG";
}(Ii || (Ii = {}));
const lt = [171, 75, 84, 88, 32, 50, 48, 187, 13, 10, 26, 10];
function KA(e) {
  const t = new Uint8Array(e);
  return !(t.byteLength < lt.length || t[0] !== lt[0] || t[1] !== lt[1] || t[2] !== lt[2] || t[3] !== lt[3] || t[4] !== lt[4] || t[5] !== lt[5] || t[6] !== lt[6] || t[7] !== lt[7] || t[8] !== lt[8] || t[9] !== lt[9] || t[10] !== lt[10] || t[11] !== lt[11]);
}
const zA = {
  etc1: {
    basisFormat: 0,
    compressed: !0,
    format: se.COMPRESSED_RGB_ETC1_WEBGL
  },
  etc2: {
    basisFormat: 1,
    compressed: !0
  },
  bc1: {
    basisFormat: 2,
    compressed: !0,
    format: se.COMPRESSED_RGB_S3TC_DXT1_EXT
  },
  bc3: {
    basisFormat: 3,
    compressed: !0,
    format: se.COMPRESSED_RGBA_S3TC_DXT5_EXT
  },
  bc4: {
    basisFormat: 4,
    compressed: !0
  },
  bc5: {
    basisFormat: 5,
    compressed: !0
  },
  "bc7-m6-opaque-only": {
    basisFormat: 6,
    compressed: !0
  },
  "bc7-m5": {
    basisFormat: 7,
    compressed: !0
  },
  "pvrtc1-4-rgb": {
    basisFormat: 8,
    compressed: !0,
    format: se.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
  },
  "pvrtc1-4-rgba": {
    basisFormat: 9,
    compressed: !0,
    format: se.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
  },
  "astc-4x4": {
    basisFormat: 10,
    compressed: !0,
    format: se.COMPRESSED_RGBA_ASTC_4X4_KHR
  },
  "atc-rgb": {
    basisFormat: 11,
    compressed: !0
  },
  "atc-rgba-interpolated-alpha": {
    basisFormat: 12,
    compressed: !0
  },
  rgba32: {
    basisFormat: 13,
    compressed: !1
  },
  rgb565: {
    basisFormat: 14,
    compressed: !1
  },
  bgr565: {
    basisFormat: 15,
    compressed: !1
  },
  rgba4444: {
    basisFormat: 16,
    compressed: !1
  }
};
async function WA(e, t) {
  if (t.basis.containerFormat === "auto") {
    if (KA(e)) {
      const s = await yi(t);
      return Si(s.KTX2File, e, t);
    }
    const {
      BasisFile: n
    } = await Bi(t);
    return os(n, e, t);
  }
  switch (t.basis.module) {
    case "encoder":
      const n = await yi(t);
      switch (t.basis.containerFormat) {
        case "ktx2":
          return Si(n.KTX2File, e, t);
        case "basis":
        default:
          return os(n.BasisFile, e, t);
      }
    case "transcoder":
    default:
      const {
        BasisFile: s
      } = await Bi(t);
      return os(s, e, t);
  }
}
function os(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("Failed to start basis transcoding");
    const r = s.getNumImages(), i = [];
    for (let o = 0; o < r; o++) {
      const a = s.getNumLevels(o), c = [];
      for (let u = 0; u < a; u++)
        c.push(XA(s, o, u, n));
      i.push(c);
    }
    return i;
  } finally {
    s.close(), s.delete();
  }
}
function XA(e, t, n, s) {
  const r = e.getImageWidth(t, n), i = e.getImageHeight(t, n), o = e.getHasAlpha(), {
    compressed: a,
    format: c,
    basisFormat: u
  } = la(s, o), l = e.getImageTranscodedSizeInBytes(t, n, u), h = new Uint8Array(l);
  if (!e.transcodeImage(h, t, n, u, 0, 0))
    throw new Error("failed to start Basis transcoding");
  return {
    width: r,
    height: i,
    data: h,
    compressed: a,
    format: c,
    hasAlpha: o
  };
}
function Si(e, t, n) {
  const s = new e(new Uint8Array(t));
  try {
    if (!s.startTranscoding())
      throw new Error("failed to start KTX2 transcoding");
    const r = s.getLevels(), i = [];
    for (let o = 0; o < r; o++) {
      i.push(QA(s, o, n));
      break;
    }
    return [i];
  } finally {
    s.close(), s.delete();
  }
}
function QA(e, t, n) {
  const {
    alphaFlag: s,
    height: r,
    width: i
  } = e.getImageLevelInfo(t, 0, 0), {
    compressed: o,
    format: a,
    basisFormat: c
  } = la(n, s), u = e.getImageTranscodedSizeInBytes(t, 0, 0, c), l = new Uint8Array(u);
  if (!e.transcodeImage(l, t, 0, 0, c, 0, -1, -1))
    throw new Error("Failed to transcode KTX2 image");
  return {
    width: i,
    height: r,
    data: l,
    compressed: o,
    levelSize: u,
    hasAlpha: s,
    format: a
  };
}
function la(e, t) {
  let n = e && e.basis && e.basis.format;
  return n === "auto" && (n = ha()), typeof n == "object" && (n = t ? n.alpha : n.noAlpha), n = n.toLowerCase(), zA[n];
}
function ha() {
  const e = kA();
  return e.has("astc") ? "astc-4x4" : e.has("dxt") ? {
    alpha: "bc3",
    noAlpha: "bc1"
  } : e.has("pvrtc") ? {
    alpha: "pvrtc1-4-rgba",
    noAlpha: "pvrtc1-4-rgb"
  } : e.has("etc1") ? "etc1" : e.has("etc2") ? "etc2" : "rgb565";
}
const qA = {
  name: "Basis",
  id: "basis",
  module: "textures",
  version: UA,
  worker: !0,
  extensions: ["basis", "ktx2"],
  mimeTypes: ["application/octet-stream", "image/ktx2"],
  tests: ["sB"],
  binary: !0,
  options: {
    basis: {
      format: "auto",
      libraryPath: "libs/",
      containerFormat: "auto",
      module: "transcoder"
    }
  }
}, YA = {
  ...qA,
  parse: WA
}, ae = !0, Di = 1735152710, Zs = 12, An = 8, $A = 1313821514, ZA = 5130562, t0 = 0, e0 = 0, n0 = 1;
function s0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return `${String.fromCharCode(e.getUint8(t + 0))}${String.fromCharCode(e.getUint8(t + 1))}${String.fromCharCode(e.getUint8(t + 2))}${String.fromCharCode(e.getUint8(t + 3))}`;
}
function r0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const s = new DataView(e), {
    magic: r = Di
  } = n, i = s.getUint32(t, !1);
  return i === r || i === Di;
}
function i0(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  const s = new DataView(t), r = s0(s, n + 0), i = s.getUint32(n + 4, ae), o = s.getUint32(n + 8, ae);
  switch (Object.assign(e, {
    header: {
      byteOffset: n,
      byteLength: o,
      hasBinChunk: !1
    },
    type: r,
    version: i,
    json: {},
    binChunks: []
  }), n += Zs, e.version) {
    case 1:
      return o0(e, s, n);
    case 2:
      return a0(e, s, n, {});
    default:
      throw new Error(`Invalid GLB version ${e.version}. Only supports version 1 and 2.`);
  }
}
function o0(e, t, n) {
  U(e.header.byteLength > Zs + An);
  const s = t.getUint32(n + 0, ae), r = t.getUint32(n + 4, ae);
  return n += An, U(r === t0), _s(e, t, n, s), n += s, n += ws(e, t, n, e.header.byteLength), n;
}
function a0(e, t, n, s) {
  return U(e.header.byteLength > Zs + An), c0(e, t, n, s), n + e.header.byteLength;
}
function c0(e, t, n, s) {
  for (; n + 8 <= e.header.byteLength; ) {
    const r = t.getUint32(n + 0, ae), i = t.getUint32(n + 4, ae);
    switch (n += An, i) {
      case $A:
        _s(e, t, n, r);
        break;
      case ZA:
        ws(e, t, n, r);
        break;
      case e0:
        s.strict || _s(e, t, n, r);
        break;
      case n0:
        s.strict || ws(e, t, n, r);
        break;
    }
    n += Ie(r, 4);
  }
  return n;
}
function _s(e, t, n, s) {
  const r = new Uint8Array(t.buffer, n, s), o = new TextDecoder("utf8").decode(r);
  return e.json = JSON.parse(o), Ie(s, 4);
}
function ws(e, t, n, s) {
  return e.header.hasBinChunk = !0, e.binChunks.push({
    byteOffset: n,
    byteLength: s,
    arrayBuffer: t.buffer
  }), Ie(s, 4);
}
function fa(e, t) {
  if (e.startsWith("data:") || e.startsWith("http:") || e.startsWith("https:"))
    return e;
  const s = t.baseUri || t.uri;
  if (!s)
    throw new Error(`'baseUri' must be provided to resolve relative url ${e}`);
  return s.substr(0, s.lastIndexOf("/") + 1) + e;
}
const u0 = "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", l0 = "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", h0 = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 3, 2, 0, 0, 5, 3, 1, 0, 1, 12, 1, 0, 10, 22, 2, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11, 7, 0, 65, 0, 253, 15, 26, 11]), f0 = new Uint8Array([32, 0, 65, 253, 3, 1, 2, 34, 4, 106, 6, 5, 11, 8, 7, 20, 13, 33, 12, 16, 128, 9, 116, 64, 19, 113, 127, 15, 10, 21, 22, 14, 255, 66, 24, 54, 136, 107, 18, 23, 192, 26, 114, 118, 132, 17, 77, 101, 130, 144, 27, 87, 131, 44, 45, 74, 156, 154, 70, 167]), d0 = {
  0: "",
  1: "meshopt_decodeFilterOct",
  2: "meshopt_decodeFilterQuat",
  3: "meshopt_decodeFilterExp",
  NONE: "",
  OCTAHEDRAL: "meshopt_decodeFilterOct",
  QUATERNION: "meshopt_decodeFilterQuat",
  EXPONENTIAL: "meshopt_decodeFilterExp"
}, m0 = {
  0: "meshopt_decodeVertexBuffer",
  1: "meshopt_decodeIndexBuffer",
  2: "meshopt_decodeIndexSequence",
  ATTRIBUTES: "meshopt_decodeVertexBuffer",
  TRIANGLES: "meshopt_decodeIndexBuffer",
  INDICES: "meshopt_decodeIndexSequence"
};
async function A0(e, t, n, s, r) {
  let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : "NONE";
  const o = await g0();
  y0(o, o.exports[m0[r]], e, t, n, s, o.exports[d0[i || "NONE"]]);
}
let as;
async function g0() {
  return as || (as = p0()), as;
}
async function p0() {
  let e = u0;
  WebAssembly.validate(h0) && (e = l0, console.log("Warning: meshopt_decoder is using experimental SIMD support"));
  const t = await WebAssembly.instantiate(B0(e), {});
  return await t.instance.exports.__wasm_call_ctors(), t.instance;
}
function B0(e) {
  const t = new Uint8Array(e.length);
  for (let s = 0; s < e.length; ++s) {
    const r = e.charCodeAt(s);
    t[s] = r > 96 ? r - 71 : r > 64 ? r - 65 : r > 47 ? r + 4 : r > 46 ? 63 : 62;
  }
  let n = 0;
  for (let s = 0; s < e.length; ++s)
    t[n++] = t[s] < 60 ? f0[t[s]] : (t[s] - 60) * 64 + t[++s];
  return t.buffer.slice(0, n);
}
function y0(e, t, n, s, r, i, o) {
  const a = e.exports.sbrk, c = s + 3 & -4, u = a(c * r), l = a(i.length), h = new Uint8Array(e.exports.memory.buffer);
  h.set(i, l);
  const f = t(u, s, r, l, i.length);
  if (f === 0 && o && o(u, c, r), n.set(h.subarray(u, u + s * r)), a(u - a(0)), f !== 0)
    throw new Error(`Malformed buffer data: ${f}`);
}
const gn = "EXT_meshopt_compression", C0 = gn;
async function T0(e, t) {
  var n, s;
  const r = new tt(e);
  if (!(t != null && (n = t.gltf) !== null && n !== void 0 && n.decompressMeshes) || !((s = t.gltf) !== null && s !== void 0 && s.loadBuffers))
    return;
  const i = [];
  for (const o of e.json.bufferViews || [])
    i.push(E0(r, o));
  await Promise.all(i), r.removeExtension(gn);
}
async function E0(e, t) {
  const n = e.getObjectExtension(t, gn);
  if (n) {
    const {
      byteOffset: s = 0,
      byteLength: r = 0,
      byteStride: i,
      count: o,
      mode: a,
      filter: c = "NONE",
      buffer: u
    } = n, l = e.gltf.buffers[u], h = new Uint8Array(l.arrayBuffer, l.byteOffset + s, r), f = new Uint8Array(e.gltf.buffers[t.buffer].arrayBuffer, t.byteOffset, t.byteLength);
    await A0(f, o, i, h, a, c), e.removeObjectExtension(t, gn);
  }
}
const b0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: T0,
  name: C0
}, Symbol.toStringTag, { value: "Module" })), re = "EXT_texture_webp", _0 = re;
function w0(e, t) {
  const n = new tt(e);
  if (!xm("image/webp")) {
    if (n.getRequiredExtensions().includes(re))
      throw new Error(`gltf: Required extension ${re} not supported by browser`);
    return;
  }
  const {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, re);
    i && (r.source = i.source), n.removeObjectExtension(r, re);
  }
  n.removeExtension(re);
}
const M0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: _0,
  preprocess: w0
}, Symbol.toStringTag, { value: "Module" })), an = "KHR_texture_basisu", R0 = an;
function I0(e, t) {
  const n = new tt(e), {
    json: s
  } = n;
  for (const r of s.textures || []) {
    const i = n.getObjectExtension(r, an);
    i && (r.source = i.source, n.removeObjectExtension(r, an));
  }
  n.removeExtension(an);
}
const S0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  name: R0,
  preprocess: I0
}, Symbol.toStringTag, { value: "Module" }));
function D0(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    if (n !== "indices") {
      const r = da(s);
      t[n] = r;
    }
  }
  return t;
}
function da(e) {
  const {
    buffer: t,
    size: n,
    count: s
  } = F0(e);
  return {
    value: t,
    size: n,
    byteOffset: 0,
    count: s,
    type: ta(n),
    componentType: Ws(t)
  };
}
function F0(e) {
  let t = e, n = 1, s = 0;
  return e && e.value && (t = e.value, n = e.size || 1), t && (ArrayBuffer.isView(t) || (t = O0(t, Float32Array)), s = t.length / n), {
    buffer: t,
    size: n,
    count: s
  };
}
function O0(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
  return e ? Array.isArray(e) ? new t(e) : n && !(e instanceof t) ? new t(e) : e : null;
}
const Jt = "KHR_draco_mesh_compression", v0 = Jt;
function x0(e, t, n) {
  const s = new tt(e);
  for (const r of ma(s))
    s.getObjectExtension(r, Jt);
}
async function L0(e, t, n) {
  var s;
  if (!(t != null && (s = t.gltf) !== null && s !== void 0 && s.decompressMeshes))
    return;
  const r = new tt(e), i = [];
  for (const o of ma(r))
    r.getObjectExtension(o, Jt) && i.push(U0(r, o, t, n));
  await Promise.all(i), r.removeExtension(Jt);
}
function G0(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const n = new tt(e);
  for (const s of n.json.meshes || [])
    P0(s, t), n.addRequiredExtension(Jt);
}
async function U0(e, t, n, s) {
  const r = e.getObjectExtension(t, Jt);
  if (!r)
    return;
  const i = e.getTypedArrayForBufferView(r.bufferView), o = Fs(i.buffer, i.byteOffset), a = {
    ...n
  };
  delete a["3d-tiles"];
  const c = await Re(o, Ko, a, s), u = D0(c.attributes);
  for (const [l, h] of Object.entries(u))
    if (l in t.attributes) {
      const f = t.attributes[l], d = e.getAccessor(f);
      d != null && d.min && d !== null && d !== void 0 && d.max && (h.min = d.min, h.max = d.max);
    }
  t.attributes = u, c.indices && (t.indices = da(c.indices)), e.removeObjectExtension(t, Jt), N0(t);
}
function P0(e, t) {
  var n;
  let s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 4, r = arguments.length > 3 ? arguments[3] : void 0, i = arguments.length > 4 ? arguments[4] : void 0;
  if (!r.DracoWriter)
    throw new Error("options.gltf.DracoWriter not provided");
  const o = r.DracoWriter.encodeSync({
    attributes: e
  }), a = i == null || (n = i.parseSync) === null || n === void 0 ? void 0 : n.call(i, {
    attributes: e
  }), c = r._addFauxAttributes(a.attributes), u = r.addBufferView(o);
  return {
    primitives: [{
      attributes: c,
      mode: s,
      extensions: {
        [Jt]: {
          bufferView: u,
          attributes: c
        }
      }
    }]
  };
}
function N0(e) {
  if (!e.attributes && Object.keys(e.attributes).length > 0)
    throw new Error("glTF: Empty primitive detected: Draco decompression failure?");
}
function* ma(e) {
  for (const t of e.json.meshes || [])
    for (const n of t.primitives)
      yield n;
}
const H0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: L0,
  encode: G0,
  name: v0,
  preprocess: x0
}, Symbol.toStringTag, { value: "Module" })), tr = "KHR_texture_transform", J0 = tr, Ze = new m(), V0 = new K(), k0 = new K();
async function j0(e, t) {
  var n;
  if (!new tt(e).hasExtension(tr) || !((n = t.gltf) !== null && n !== void 0 && n.loadBuffers))
    return;
  const i = e.json.materials || [];
  for (let o = 0; o < i.length; o++)
    K0(o, e);
}
function K0(e, t) {
  var n, s, r;
  const i = [], o = (n = t.json.materials) === null || n === void 0 ? void 0 : n[e], a = o == null || (s = o.pbrMetallicRoughness) === null || s === void 0 ? void 0 : s.baseColorTexture;
  a && ge(t, e, a, i);
  const c = o == null ? void 0 : o.emissiveTexture;
  c && ge(t, e, c, i);
  const u = o == null ? void 0 : o.normalTexture;
  u && ge(t, e, u, i);
  const l = o == null ? void 0 : o.occlusionTexture;
  l && ge(t, e, l, i);
  const h = o == null || (r = o.pbrMetallicRoughness) === null || r === void 0 ? void 0 : r.metallicRoughnessTexture;
  h && ge(t, e, h, i);
}
function ge(e, t, n, s) {
  const r = z0(n, s);
  if (!r)
    return;
  const i = e.json.meshes || [];
  for (const o of i)
    for (const a of o.primitives) {
      const c = a.material;
      Number.isFinite(c) && t === c && W0(e, a, r);
    }
}
function z0(e, t) {
  var n;
  const s = (n = e.extensions) === null || n === void 0 ? void 0 : n[tr], {
    texCoord: r = 0
  } = e, {
    texCoord: i = r
  } = s;
  if (!(t.findIndex((a) => {
    let [c, u] = a;
    return c === r && u === i;
  }) !== -1)) {
    const a = q0(s);
    return r !== i && (e.texCoord = i), t.push([r, i]), {
      originalTexCoord: r,
      texCoord: i,
      matrix: a
    };
  }
  return null;
}
function W0(e, t, n) {
  const {
    originalTexCoord: s,
    texCoord: r,
    matrix: i
  } = n, o = t.attributes[`TEXCOORD_${s}`];
  if (Number.isFinite(o)) {
    var a;
    const u = (a = e.json.accessors) === null || a === void 0 ? void 0 : a[o];
    if (u && u.bufferView) {
      var c;
      const l = (c = e.json.bufferViews) === null || c === void 0 ? void 0 : c[u.bufferView];
      if (l) {
        const {
          arrayBuffer: h,
          byteOffset: f
        } = e.buffers[l.buffer], d = (f || 0) + (u.byteOffset || 0) + (l.byteOffset || 0), {
          ArrayType: A,
          length: g
        } = Xs(u, l), p = Zo[u.componentType], y = $o[u.type], _ = l.byteStride || p * y, b = new Float32Array(g);
        for (let w = 0; w < u.count; w++) {
          const M = new A(h, d + w * _, 2);
          Ze.set(M[0], M[1], 1), Ze.transformByMatrix3(i), b.set([Ze[0], Ze[1]], w * y);
        }
        s === r ? X0(u, l, e.buffers, b) : Q0(r, u, t, e, b);
      }
    }
  }
}
function X0(e, t, n, s) {
  e.componentType = 5126, n.push({
    arrayBuffer: s.buffer,
    byteOffset: 0,
    byteLength: s.buffer.byteLength
  }), t.buffer = n.length - 1, t.byteLength = s.buffer.byteLength, t.byteOffset = 0, delete t.byteStride;
}
function Q0(e, t, n, s, r) {
  s.buffers.push({
    arrayBuffer: r.buffer,
    byteOffset: 0,
    byteLength: r.buffer.byteLength
  });
  const i = s.json.bufferViews;
  if (!i)
    return;
  i.push({
    buffer: s.buffers.length - 1,
    byteLength: r.buffer.byteLength,
    byteOffset: 0
  });
  const o = s.json.accessors;
  o && (o.push({
    bufferView: (i == null ? void 0 : i.length) - 1,
    byteOffset: 0,
    componentType: 5126,
    count: t.count,
    type: "VEC2"
  }), n.attributes[`TEXCOORD_${e}`] = o.length - 1);
}
function q0(e) {
  const {
    offset: t = [0, 0],
    rotation: n = 0,
    scale: s = [1, 1]
  } = e, r = new K().set(1, 0, 0, 0, 1, 0, t[0], t[1], 1), i = V0.set(Math.cos(n), Math.sin(n), 0, -Math.sin(n), Math.cos(n), 0, 0, 0, 1), o = k0.set(s[0], 0, 0, 0, s[1], 0, 0, 0, 1);
  return r.multiplyRight(i).multiplyRight(o);
}
const Y0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: j0,
  name: J0
}, Symbol.toStringTag, { value: "Module" })), Kt = "KHR_lights_punctual", $0 = Kt;
async function Z0(e) {
  const t = new tt(e), {
    json: n
  } = t, s = t.getExtension(Kt);
  s && (t.json.lights = s.lights, t.removeExtension(Kt));
  for (const r of n.nodes || []) {
    const i = t.getObjectExtension(r, Kt);
    i && (r.light = i.light), t.removeObjectExtension(r, Kt);
  }
}
async function tg(e) {
  const t = new tt(e), {
    json: n
  } = t;
  if (n.lights) {
    const s = t.addExtension(Kt);
    ft(!s.lights), s.lights = n.lights, delete n.lights;
  }
  if (t.json.lights) {
    for (const s of t.json.lights) {
      const r = s.node;
      t.addObjectExtension(r, Kt, s);
    }
    delete t.json.lights;
  }
}
const eg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Z0,
  encode: tg,
  name: $0
}, Symbol.toStringTag, { value: "Module" })), Me = "KHR_materials_unlit", ng = Me;
async function sg(e) {
  const t = new tt(e), {
    json: n
  } = t;
  for (const s of n.materials || [])
    s.extensions && s.extensions.KHR_materials_unlit && (s.unlit = !0), t.removeObjectExtension(s, Me);
  t.removeExtension(Me);
}
function rg(e) {
  const t = new tt(e), {
    json: n
  } = t;
  if (t.materials)
    for (const s of n.materials || [])
      s.unlit && (delete s.unlit, t.addObjectExtension(s, Me, {}), t.addExtension(Me));
}
const ig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: sg,
  encode: rg,
  name: ng
}, Symbol.toStringTag, { value: "Module" })), Be = "KHR_techniques_webgl", og = Be;
async function ag(e) {
  const t = new tt(e), {
    json: n
  } = t, s = t.getExtension(Be);
  if (s) {
    const r = ug(s, t);
    for (const i of n.materials || []) {
      const o = t.getObjectExtension(i, Be);
      o && (i.technique = Object.assign({}, o, r[o.technique]), i.technique.values = lg(i.technique, t)), t.removeObjectExtension(i, Be);
    }
    t.removeExtension(Be);
  }
}
async function cg(e, t) {
}
function ug(e, t) {
  const {
    programs: n = [],
    shaders: s = [],
    techniques: r = []
  } = e, i = new TextDecoder();
  return s.forEach((o) => {
    if (Number.isFinite(o.bufferView))
      o.code = i.decode(t.getTypedArrayForBufferView(o.bufferView));
    else
      throw new Error("KHR_techniques_webgl: no shader code");
  }), n.forEach((o) => {
    o.fragmentShader = s[o.fragmentShader], o.vertexShader = s[o.vertexShader];
  }), r.forEach((o) => {
    o.program = n[o.program];
  }), r;
}
function lg(e, t) {
  const n = Object.assign({}, e.values);
  return Object.keys(e.uniforms || {}).forEach((s) => {
    e.uniforms[s].value && !(s in n) && (n[s] = e.uniforms[s].value);
  }), Object.keys(n).forEach((s) => {
    typeof n[s] == "object" && n[s].index !== void 0 && (n[s].texture = t.getTexture(n[s].index));
  }), n;
}
const hg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: ag,
  encode: cg,
  name: og
}, Symbol.toStringTag, { value: "Module" })), Aa = [BA, tA, b0, M0, S0, H0, eg, ig, hg, Y0, LA];
function fg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = Aa.filter((i) => ga(i.name, t));
  for (const i of s) {
    var r;
    (r = i.preprocess) === null || r === void 0 || r.call(i, e, t, n);
  }
}
async function dg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = Aa.filter((i) => ga(i.name, t));
  for (const i of s) {
    var r;
    await ((r = i.decode) === null || r === void 0 ? void 0 : r.call(i, e, t, n));
  }
}
function ga(e, t) {
  var n;
  const s = (t == null || (n = t.gltf) === null || n === void 0 ? void 0 : n.excludeExtensions) || {};
  return !(e in s && !s[e]);
}
const cs = "KHR_binary_glTF";
function mg(e) {
  const t = new tt(e), {
    json: n
  } = t;
  for (const s of n.images || []) {
    const r = t.getObjectExtension(s, cs);
    r && Object.assign(s, r), t.removeObjectExtension(s, cs);
  }
  n.buffers && n.buffers[0] && delete n.buffers[0].uri, t.removeExtension(cs);
}
const Fi = {
  accessors: "accessor",
  animations: "animation",
  buffers: "buffer",
  bufferViews: "bufferView",
  images: "image",
  materials: "material",
  meshes: "mesh",
  nodes: "node",
  samplers: "sampler",
  scenes: "scene",
  skins: "skin",
  textures: "texture"
}, Ag = {
  accessor: "accessors",
  animations: "animation",
  buffer: "buffers",
  bufferView: "bufferViews",
  image: "images",
  material: "materials",
  mesh: "meshes",
  node: "nodes",
  sampler: "samplers",
  scene: "scenes",
  skin: "skins",
  texture: "textures"
};
class gg {
  constructor() {
    this.idToIndexMap = {
      animations: {},
      accessors: {},
      buffers: {},
      bufferViews: {},
      images: {},
      materials: {},
      meshes: {},
      nodes: {},
      samplers: {},
      scenes: {},
      skins: {},
      textures: {}
    }, this.json = void 0;
  }
  normalize(t, n) {
    this.json = t.json;
    const s = t.json;
    switch (s.asset && s.asset.version) {
      case "2.0":
        return;
      case void 0:
      case "1.0":
        break;
      default:
        console.warn(`glTF: Unknown version ${s.asset.version}`);
        return;
    }
    if (!n.normalize)
      throw new Error("glTF v1 is not supported.");
    console.warn("Converting glTF v1 to glTF v2 format. This is experimental and may fail."), this._addAsset(s), this._convertTopLevelObjectsToArrays(s), mg(t), this._convertObjectIdsToArrayIndices(s), this._updateObjects(s), this._updateMaterial(s);
  }
  _addAsset(t) {
    t.asset = t.asset || {}, t.asset.version = "2.0", t.asset.generator = t.asset.generator || "Normalized to glTF 2.0 by loaders.gl";
  }
  _convertTopLevelObjectsToArrays(t) {
    for (const n in Fi)
      this._convertTopLevelObjectToArray(t, n);
  }
  _convertTopLevelObjectToArray(t, n) {
    const s = t[n];
    if (!(!s || Array.isArray(s))) {
      t[n] = [];
      for (const r in s) {
        const i = s[r];
        i.id = i.id || r;
        const o = t[n].length;
        t[n].push(i), this.idToIndexMap[n][r] = o;
      }
    }
  }
  _convertObjectIdsToArrayIndices(t) {
    for (const n in Fi)
      this._convertIdsToIndices(t, n);
    "scene" in t && (t.scene = this._convertIdToIndex(t.scene, "scene"));
    for (const n of t.textures)
      this._convertTextureIds(n);
    for (const n of t.meshes)
      this._convertMeshIds(n);
    for (const n of t.nodes)
      this._convertNodeIds(n);
    for (const n of t.scenes)
      this._convertSceneIds(n);
  }
  _convertTextureIds(t) {
    t.source && (t.source = this._convertIdToIndex(t.source, "image"));
  }
  _convertMeshIds(t) {
    for (const n of t.primitives) {
      const {
        attributes: s,
        indices: r,
        material: i
      } = n;
      for (const o in s)
        s[o] = this._convertIdToIndex(s[o], "accessor");
      r && (n.indices = this._convertIdToIndex(r, "accessor")), i && (n.material = this._convertIdToIndex(i, "material"));
    }
  }
  _convertNodeIds(t) {
    t.children && (t.children = t.children.map((n) => this._convertIdToIndex(n, "node"))), t.meshes && (t.meshes = t.meshes.map((n) => this._convertIdToIndex(n, "mesh")));
  }
  _convertSceneIds(t) {
    t.nodes && (t.nodes = t.nodes.map((n) => this._convertIdToIndex(n, "node")));
  }
  _convertIdsToIndices(t, n) {
    t[n] || (console.warn(`gltf v1: json doesn't contain attribute ${n}`), t[n] = []);
    for (const s of t[n])
      for (const r in s) {
        const i = s[r], o = this._convertIdToIndex(i, r);
        s[r] = o;
      }
  }
  _convertIdToIndex(t, n) {
    const s = Ag[n];
    if (s in this.idToIndexMap) {
      const r = this.idToIndexMap[s][t];
      if (!Number.isFinite(r))
        throw new Error(`gltf v1: failed to resolve ${n} with id ${t}`);
      return r;
    }
    return t;
  }
  _updateObjects(t) {
    for (const n of this.json.buffers)
      delete n.type;
  }
  _updateMaterial(t) {
    for (const i of t.materials) {
      var n, s, r;
      i.pbrMetallicRoughness = {
        baseColorFactor: [1, 1, 1, 1],
        metallicFactor: 1,
        roughnessFactor: 1
      };
      const o = ((n = i.values) === null || n === void 0 ? void 0 : n.tex) || ((s = i.values) === null || s === void 0 ? void 0 : s.texture2d_0) || ((r = i.values) === null || r === void 0 ? void 0 : r.diffuseTex), a = t.textures.findIndex((c) => c.id === o);
      a !== -1 && (i.pbrMetallicRoughness.baseColorTexture = {
        index: a
      });
    }
  }
}
function pg(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return new gg().normalize(e, t);
}
async function Bg(e, t) {
  var n, s, r;
  let i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, o = arguments.length > 3 ? arguments[3] : void 0, a = arguments.length > 4 ? arguments[4] : void 0;
  return yg(e, t, i, o), pg(e, {
    normalize: o == null || (n = o.gltf) === null || n === void 0 ? void 0 : n.normalize
  }), fg(e, o, a), o != null && (s = o.gltf) !== null && s !== void 0 && s.loadBuffers && e.json.buffers && await Cg(e, o, a), o != null && (r = o.gltf) !== null && r !== void 0 && r.loadImages && await Tg(e, o, a), await dg(e, o, a), e;
}
function yg(e, t, n, s) {
  if (s.uri && (e.baseUri = s.uri), t instanceof ArrayBuffer && !r0(t, n, s) && (t = new TextDecoder().decode(t)), typeof t == "string")
    e.json = Sc(t);
  else if (t instanceof ArrayBuffer) {
    const o = {};
    n = i0(o, t, n, s.glb), ft(o.type === "glTF", `Invalid GLB magic string ${o.type}`), e._glb = o, e.json = o.json;
  } else
    ft(!1, "GLTF: must be ArrayBuffer or string");
  const r = e.json.buffers || [];
  if (e.buffers = new Array(r.length).fill(null), e._glb && e._glb.header.hasBinChunk) {
    const {
      binChunks: o
    } = e._glb;
    e.buffers[0] = {
      arrayBuffer: o[0].arrayBuffer,
      byteOffset: o[0].byteOffset,
      byteLength: o[0].byteLength
    };
  }
  const i = e.json.images || [];
  e.images = new Array(i.length).fill({});
}
async function Cg(e, t, n) {
  const s = e.json.buffers || [];
  for (let o = 0; o < s.length; ++o) {
    const a = s[o];
    if (a.uri) {
      var r, i;
      const {
        fetch: c
      } = n;
      ft(c);
      const u = fa(a.uri, t), l = await (n == null || (r = n.fetch) === null || r === void 0 ? void 0 : r.call(n, u)), h = await (l == null || (i = l.arrayBuffer) === null || i === void 0 ? void 0 : i.call(l));
      e.buffers[o] = {
        arrayBuffer: h,
        byteOffset: 0,
        byteLength: h.byteLength
      }, delete a.uri;
    } else
      e.buffers[o] === null && (e.buffers[o] = {
        arrayBuffer: new ArrayBuffer(a.byteLength),
        byteOffset: 0,
        byteLength: a.byteLength
      });
  }
}
async function Tg(e, t, n) {
  const s = Eg(e), r = e.json.images || [], i = [];
  for (const o of s)
    i.push(bg(e, r[o], o, t, n));
  return await Promise.all(i);
}
function Eg(e) {
  const t = /* @__PURE__ */ new Set(), n = e.json.textures || [];
  for (const s of n)
    s.source !== void 0 && t.add(s.source);
  return Array.from(t).sort();
}
async function bg(e, t, n, s, r) {
  let i;
  if (t.uri && !t.hasOwnProperty("bufferView")) {
    const a = fa(t.uri, s), {
      fetch: c
    } = r;
    i = await (await c(a)).arrayBuffer(), t.bufferView = {
      data: i
    };
  }
  if (Number.isFinite(t.bufferView)) {
    const a = jm(e.json, e.buffers, t.bufferView);
    i = Fs(a.buffer, a.byteOffset, a.byteLength);
  }
  ft(i, "glTF image has no data");
  let o = await Re(i, [vm, YA], {
    ...s,
    mimeType: t.mimeType,
    basis: s.basis || {
      format: ha()
    }
  }, r);
  o && o[0] && (o = {
    compressed: !0,
    mipmaps: !1,
    width: o[0].width,
    height: o[0].height,
    data: o[0]
  }), e.images = e.images || [], e.images[n] = o;
}
const pn = {
  name: "glTF",
  id: "gltf",
  module: "gltf",
  version: GA,
  extensions: ["gltf", "glb"],
  mimeTypes: ["model/gltf+json", "model/gltf-binary"],
  text: !0,
  binary: !0,
  tests: ["glTF"],
  parse: _g,
  options: {
    gltf: {
      normalize: !0,
      loadBuffers: !0,
      loadImages: !0,
      decompressMeshes: !0
    },
    log: console
  }
};
async function _g(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  t = {
    ...pn.options,
    ...t
  }, t.gltf = {
    ...pn.options.gltf,
    ...t.gltf
  };
  const {
    byteOffset: s = 0
  } = t;
  return await Bg({}, e, s, t, n);
}
const wg = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, Mg = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
}, mt = {
  TEXTURE_MAG_FILTER: 10240,
  TEXTURE_MIN_FILTER: 10241,
  TEXTURE_WRAP_S: 10242,
  TEXTURE_WRAP_T: 10243,
  REPEAT: 10497,
  LINEAR: 9729,
  NEAREST_MIPMAP_LINEAR: 9986
}, Rg = {
  magFilter: mt.TEXTURE_MAG_FILTER,
  minFilter: mt.TEXTURE_MIN_FILTER,
  wrapS: mt.TEXTURE_WRAP_S,
  wrapT: mt.TEXTURE_WRAP_T
}, Ig = {
  [mt.TEXTURE_MAG_FILTER]: mt.LINEAR,
  [mt.TEXTURE_MIN_FILTER]: mt.NEAREST_MIPMAP_LINEAR,
  [mt.TEXTURE_WRAP_S]: mt.REPEAT,
  [mt.TEXTURE_WRAP_T]: mt.REPEAT
};
function Sg() {
  return {
    id: "default-sampler",
    parameters: Ig
  };
}
function Dg(e) {
  return Mg[e];
}
function Fg(e) {
  return wg[e];
}
class Og {
  constructor() {
    this.baseUri = "", this.jsonUnprocessed = void 0, this.json = void 0, this.buffers = [], this.images = [];
  }
  postProcess(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const {
      json: s,
      buffers: r = [],
      images: i = []
    } = t, {
      baseUri: o = ""
    } = t;
    return ft(s), this.baseUri = o, this.buffers = r, this.images = i, this.jsonUnprocessed = s, this.json = this._resolveTree(t.json, n), this.json;
  }
  _resolveTree(t) {
    const n = {
      ...t
    };
    return this.json = n, t.bufferViews && (n.bufferViews = t.bufferViews.map((s, r) => this._resolveBufferView(s, r))), t.images && (n.images = t.images.map((s, r) => this._resolveImage(s, r))), t.samplers && (n.samplers = t.samplers.map((s, r) => this._resolveSampler(s, r))), t.textures && (n.textures = t.textures.map((s, r) => this._resolveTexture(s, r))), t.accessors && (n.accessors = t.accessors.map((s, r) => this._resolveAccessor(s, r))), t.materials && (n.materials = t.materials.map((s, r) => this._resolveMaterial(s, r))), t.meshes && (n.meshes = t.meshes.map((s, r) => this._resolveMesh(s, r))), t.nodes && (n.nodes = t.nodes.map((s, r) => this._resolveNode(s, r)), n.nodes = n.nodes.map((s, r) => this._resolveNodeChildren(s))), t.skins && (n.skins = t.skins.map((s, r) => this._resolveSkin(s, r))), t.scenes && (n.scenes = t.scenes.map((s, r) => this._resolveScene(s, r))), typeof this.json.scene == "number" && n.scenes && (n.scene = n.scenes[this.json.scene]), n;
  }
  getScene(t) {
    return this._get(this.json.scenes, t);
  }
  getNode(t) {
    return this._get(this.json.nodes, t);
  }
  getSkin(t) {
    return this._get(this.json.skins, t);
  }
  getMesh(t) {
    return this._get(this.json.meshes, t);
  }
  getMaterial(t) {
    return this._get(this.json.materials, t);
  }
  getAccessor(t) {
    return this._get(this.json.accessors, t);
  }
  getCamera(t) {
    return this._get(this.json.cameras, t);
  }
  getTexture(t) {
    return this._get(this.json.textures, t);
  }
  getSampler(t) {
    return this._get(this.json.samplers, t);
  }
  getImage(t) {
    return this._get(this.json.images, t);
  }
  getBufferView(t) {
    return this._get(this.json.bufferViews, t);
  }
  getBuffer(t) {
    return this._get(this.json.buffers, t);
  }
  _get(t, n) {
    if (typeof n == "object")
      return n;
    const s = t && t[n];
    return s || console.warn(`glTF file error: Could not find ${t}[${n}]`), s;
  }
  _resolveScene(t, n) {
    return {
      ...t,
      id: t.id || `scene-${n}`,
      nodes: (t.nodes || []).map((s) => this.getNode(s))
    };
  }
  _resolveNode(t, n) {
    const s = {
      ...t,
      id: (t == null ? void 0 : t.id) || `node-${n}`
    };
    return t.mesh !== void 0 && (s.mesh = this.getMesh(t.mesh)), t.camera !== void 0 && (s.camera = this.getCamera(t.camera)), t.skin !== void 0 && (s.skin = this.getSkin(t.skin)), t.meshes !== void 0 && t.meshes.length && (s.mesh = t.meshes.reduce((r, i) => {
      const o = this.getMesh(i);
      return r.id = o.id, r.primitives = r.primitives.concat(o.primitives), r;
    }, {
      primitives: []
    })), s;
  }
  _resolveNodeChildren(t) {
    return t.children && (t.children = t.children.map((n) => this.getNode(n))), t;
  }
  _resolveSkin(t, n) {
    const s = typeof t.inverseBindMatrices == "number" ? this.getAccessor(t.inverseBindMatrices) : void 0;
    return {
      ...t,
      id: t.id || `skin-${n}`,
      inverseBindMatrices: s
    };
  }
  _resolveMesh(t, n) {
    const s = {
      ...t,
      id: t.id || `mesh-${n}`,
      primitives: []
    };
    return t.primitives && (s.primitives = t.primitives.map((r) => {
      const i = {
        ...r,
        attributes: {},
        indices: void 0,
        material: void 0
      }, o = r.attributes;
      for (const a in o)
        i.attributes[a] = this.getAccessor(o[a]);
      return r.indices !== void 0 && (i.indices = this.getAccessor(r.indices)), r.material !== void 0 && (i.material = this.getMaterial(r.material)), i;
    })), s;
  }
  _resolveMaterial(t, n) {
    const s = {
      ...t,
      id: t.id || `material-${n}`
    };
    if (s.normalTexture && (s.normalTexture = {
      ...s.normalTexture
    }, s.normalTexture.texture = this.getTexture(s.normalTexture.index)), s.occlusionTexture && (s.occlusionTexture = {
      ...s.occlusionTexture
    }, s.occlusionTexture.texture = this.getTexture(s.occlusionTexture.index)), s.emissiveTexture && (s.emissiveTexture = {
      ...s.emissiveTexture
    }, s.emissiveTexture.texture = this.getTexture(s.emissiveTexture.index)), s.emissiveFactor || (s.emissiveFactor = s.emissiveTexture ? [1, 1, 1] : [0, 0, 0]), s.pbrMetallicRoughness) {
      s.pbrMetallicRoughness = {
        ...s.pbrMetallicRoughness
      };
      const r = s.pbrMetallicRoughness;
      r.baseColorTexture && (r.baseColorTexture = {
        ...r.baseColorTexture
      }, r.baseColorTexture.texture = this.getTexture(r.baseColorTexture.index)), r.metallicRoughnessTexture && (r.metallicRoughnessTexture = {
        ...r.metallicRoughnessTexture
      }, r.metallicRoughnessTexture.texture = this.getTexture(r.metallicRoughnessTexture.index));
    }
    return s;
  }
  _resolveAccessor(t, n) {
    const s = Dg(t.componentType), r = Fg(t.type), i = s * r, o = {
      ...t,
      id: t.id || `accessor-${n}`,
      bytesPerComponent: s,
      components: r,
      bytesPerElement: i,
      value: void 0,
      bufferView: void 0,
      sparse: void 0
    };
    if (t.bufferView !== void 0 && (o.bufferView = this.getBufferView(t.bufferView)), o.bufferView) {
      const a = o.bufferView.buffer, {
        ArrayType: c,
        byteLength: u
      } = Xs(o, o.bufferView), l = (o.bufferView.byteOffset || 0) + (o.byteOffset || 0) + a.byteOffset;
      let h = a.arrayBuffer.slice(l, l + u);
      o.bufferView.byteStride && (h = this._getValueFromInterleavedBuffer(a, l, o.bufferView.byteStride, o.bytesPerElement, o.count)), o.value = new c(h);
    }
    return o;
  }
  _getValueFromInterleavedBuffer(t, n, s, r, i) {
    const o = new Uint8Array(i * r);
    for (let a = 0; a < i; a++) {
      const c = n + a * s;
      o.set(new Uint8Array(t.arrayBuffer.slice(c, c + r)), a * r);
    }
    return o.buffer;
  }
  _resolveTexture(t, n) {
    return {
      ...t,
      id: t.id || `texture-${n}`,
      sampler: typeof t.sampler == "number" ? this.getSampler(t.sampler) : Sg(),
      source: typeof t.source == "number" ? this.getImage(t.source) : void 0
    };
  }
  _resolveSampler(t, n) {
    const s = {
      id: t.id || `sampler-${n}`,
      ...t,
      parameters: {}
    };
    for (const r in s) {
      const i = this._enumSamplerParameter(r);
      i !== void 0 && (s.parameters[i] = s[r]);
    }
    return s;
  }
  _enumSamplerParameter(t) {
    return Rg[t];
  }
  _resolveImage(t, n) {
    const s = {
      ...t,
      id: t.id || `image-${n}`,
      image: null,
      bufferView: t.bufferView !== void 0 ? this.getBufferView(t.bufferView) : void 0
    }, r = this.images[n];
    return r && (s.image = r), s;
  }
  _resolveBufferView(t, n) {
    const s = t.buffer, r = this.buffers[s].arrayBuffer;
    let i = this.buffers[s].byteOffset || 0;
    return t.byteOffset && (i += t.byteOffset), {
      id: `bufferView-${n}`,
      ...t,
      buffer: this.buffers[s],
      data: new Uint8Array(r, i, t.byteLength)
    };
  }
  _resolveCamera(t, n) {
    const s = {
      ...t,
      id: t.id || `camera-${n}`
    };
    return s.perspective, s.orthographic, s;
  }
}
function pa(e, t) {
  return new Og().postProcess(e, t);
}
const Ms = {
  URI: 0,
  EMBEDDED: 1
};
function Ba(e, t, n, s) {
  e.rotateYtoZ = !0;
  const r = (e.byteOffset || 0) + (e.byteLength || 0) - n;
  if (r === 0)
    throw new Error("glTF byte length must be greater than 0.");
  return e.gltfUpAxis = s != null && s["3d-tiles"] && s["3d-tiles"].assetGltfUpAxis ? s["3d-tiles"].assetGltfUpAxis : "Y", e.gltfArrayBuffer = Fs(t, n, r), e.gltfByteOffset = 0, e.gltfByteLength = r, n % 4 === 0 || console.warn(`${e.type}: embedded glb is not aligned to a 4-byte boundary.`), (e.byteOffset || 0) + (e.byteLength || 0);
}
async function ya(e, t, n, s) {
  const r = (n == null ? void 0 : n["3d-tiles"]) || {};
  if (vg(e, t), r.loadGLTF) {
    if (!s)
      return;
    if (e.gltfUrl) {
      const {
        fetch: i
      } = s, o = await i(e.gltfUrl, n);
      e.gltfArrayBuffer = await o.arrayBuffer(), e.gltfByteOffset = 0;
    }
    if (e.gltfArrayBuffer) {
      const i = await Re(e.gltfArrayBuffer, pn, n, s);
      e.gltf = pa(i), e.gpuMemoryUsageInBytes = ea(e.gltf), delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
    }
  }
}
function vg(e, t, n) {
  switch (t) {
    case Ms.URI:
      if (e.gltfArrayBuffer) {
        const s = new Uint8Array(e.gltfArrayBuffer, e.gltfByteOffset), i = new TextDecoder().decode(s);
        e.gltfUrl = i.replace(/[\s\0]+$/, "");
      }
      delete e.gltfArrayBuffer, delete e.gltfByteOffset, delete e.gltfByteLength;
      break;
    case Ms.EMBEDDED:
      break;
    default:
      throw new Error("b3dm: Illegal glTF format field");
  }
}
async function xg(e, t, n, s, r) {
  var i;
  n = Lg(e, t, n, s), await ya(e, Ms.EMBEDDED, s, r);
  const o = e == null || (i = e.gltf) === null || i === void 0 ? void 0 : i.extensions;
  return o && o.CESIUM_RTC && (e.rtcCenter = o.CESIUM_RTC.center), n;
}
function Lg(e, t, n, s, r) {
  n = Rn(e, t, n), n = ks(e, t, n), n = js(e, t, n), n = Ba(e, t, n, s);
  const i = new Vs(e.featureTableJson, e.featureTableBinary);
  return e.rtcCenter = i.getGlobalProperty("RTC_CENTER", x.FLOAT, 3), n;
}
async function Gg(e, t, n, s, r) {
  return n = Ug(e, t, n, s), await ya(e, e.gltfFormat || 0, s, r), n;
}
function Ug(e, t, n, s, r) {
  var i;
  if (n = Rn(e, t, n), e.version !== 1)
    throw new Error(`Instanced 3D Model version ${e.version} is not supported`);
  n = ks(e, t, n);
  const o = new DataView(t);
  if (e.gltfFormat = o.getUint32(n, !0), n += 4, n = js(e, t, n), n = Ba(e, t, n, s), !(e != null && (i = e.header) !== null && i !== void 0 && i.featureTableJsonByteLength) || e.header.featureTableJsonByteLength === 0)
    throw new Error("i3dm parser: featureTableJsonByteLength is zero.");
  const a = new Vs(e.featureTableJson, e.featureTableBinary), c = a.getGlobalProperty("INSTANCES_LENGTH");
  if (a.featuresLength = c, !Number.isFinite(c))
    throw new Error("i3dm parser: INSTANCES_LENGTH must be defined");
  e.eastNorthUp = a.getGlobalProperty("EAST_NORTH_UP"), e.rtcCenter = a.getGlobalProperty("RTC_CENTER", x.FLOAT, 3);
  const u = new Wo(e.batchTableJson, e.batchTableBinary, c);
  return Pg(e, a, u, c), n;
}
function Pg(e, t, n, s) {
  const r = new Array(s), i = new m();
  new m(), new m(), new m();
  const o = new K(), a = new hn(), c = new m(), u = {}, l = new N(), h = [], f = [], d = [], A = [];
  for (let g = 0; g < s; g++) {
    let p;
    if (t.hasProperty("POSITION"))
      p = t.getProperty("POSITION", x.FLOAT, 3, g, i);
    else if (t.hasProperty("POSITION_QUANTIZED")) {
      p = t.getProperty("POSITION_QUANTIZED", x.UNSIGNED_SHORT, 3, g, i);
      const C = t.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", x.FLOAT, 3);
      if (!C)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
      const D = t.getGlobalProperty("QUANTIZED_VOLUME_SCALE", x.FLOAT, 3);
      if (!D)
        throw new Error("i3dm parser: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");
      const F = 65535;
      for (let I = 0; I < 3; I++)
        p[I] = p[I] / F * D[I] + C[I];
    }
    if (!p)
      throw new Error("i3dm: POSITION or POSITION_QUANTIZED must be defined for each instance.");
    if (i.copy(p), u.translation = i, e.normalUp = t.getProperty("NORMAL_UP", x.FLOAT, 3, g, h), e.normalRight = t.getProperty("NORMAL_RIGHT", x.FLOAT, 3, g, f), e.normalUp) {
      if (!e.normalRight)
        throw new Error("i3dm: Custom orientation requires both NORMAL_UP and NORMAL_RIGHT.");
      e.hasCustomOrientation = !0;
    } else {
      if (e.octNormalUp = t.getProperty("NORMAL_UP_OCT32P", x.UNSIGNED_SHORT, 2, g, h), e.octNormalRight = t.getProperty("NORMAL_RIGHT_OCT32P", x.UNSIGNED_SHORT, 2, g, f), e.octNormalUp)
        throw e.octNormalRight ? new Error("i3dm: oct-encoded orientation not implemented") : new Error("i3dm: oct-encoded orientation requires NORMAL_UP_OCT32P and NORMAL_RIGHT_OCT32P");
      e.eastNorthUp ? (H.WGS84.eastNorthUpToFixedFrame(i, l), l.getRotationMatrix3(o)) : o.identity();
    }
    a.fromMatrix3(o), u.rotation = a, c.set(1, 1, 1);
    const y = t.getProperty("SCALE", x.FLOAT, 1, g, d);
    Number.isFinite(y) && c.multiplyByScalar(y);
    const _ = t.getProperty("SCALE_NON_UNIFORM", x.FLOAT, 3, g, h);
    _ && c.scale(_), u.scale = c;
    let b = t.getProperty("BATCH_ID", x.UNSIGNED_SHORT, 1, g, A);
    b === void 0 && (b = g);
    const w = new N().fromQuaternion(u.rotation);
    l.identity(), l.translate(u.translation), l.multiplyRight(w), l.scale(u.scale);
    const M = l.clone();
    r[g] = {
      modelMatrix: M,
      batchId: b
    };
  }
  e.instances = r;
}
async function Ng(e, t, n, s, r, i) {
  n = Rn(e, t, n);
  const o = new DataView(t);
  for (e.tilesLength = o.getUint32(n, !0), n += 4, e.tiles = []; e.tiles.length < e.tilesLength && (e.byteLength || 0) - n > 12; ) {
    const a = {
      shape: "tile3d"
    };
    e.tiles.push(a), n = await i(t, n, s, r, a);
  }
  return n;
}
async function Hg(e, t, n, s) {
  var r, i;
  if (e.rotateYtoZ = !0, e.gltfUpAxis = n != null && (r = n["3d-tiles"]) !== null && r !== void 0 && r.assetGltfUpAxis ? n["3d-tiles"].assetGltfUpAxis : "Y", n != null && (i = n["3d-tiles"]) !== null && i !== void 0 && i.loadGLTF) {
    if (!s)
      return t.byteLength;
    const o = await Re(t, pn, n, s);
    e.gltf = pa(o), e.gpuMemoryUsageInBytes = ea(e.gltf);
  } else
    e.gltfArrayBuffer = t;
  return t.byteLength;
}
async function Ca(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0, r = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
    shape: "tile3d"
  };
  switch (r.byteOffset = t, r.type = cd(e, t), r.type) {
    case de.COMPOSITE:
      return await Ng(r, e, t, n, s, Ca);
    case de.BATCHED_3D_MODEL:
      return await xg(r, e, t, n, s);
    case de.GLTF:
      return await Hg(r, e, n, s);
    case de.INSTANCED_3D_MODEL:
      return await Gg(r, e, t, n, s);
    case de.POINT_CLOUD:
      return await zd(r, e, t, n, s);
    default:
      throw new Error(`3DTileLoader: unknown type ${r.type}`);
  }
}
const Jg = 1952609651, Vg = 1;
async function kg(e, t, n) {
  if (new Uint32Array(e.slice(0, 4))[0] !== Jg)
    throw new Error("Wrong subtree file magic number");
  if (new Uint32Array(e.slice(4, 8))[0] !== Vg)
    throw new Error("Wrong subtree file verson, must be 1");
  const i = Oi(e.slice(8, 16)), o = new Uint8Array(e, 24, i), c = new TextDecoder("utf8").decode(o), u = JSON.parse(c), l = Oi(e.slice(16, 24));
  let h = new ArrayBuffer(0);
  if (l && (h = e.slice(24 + i)), await tn(u, u.tileAvailability, h, n), Array.isArray(u.contentAvailability))
    for (const f of u.contentAvailability)
      await tn(u, f, h, n);
  else
    await tn(u, u.contentAvailability, h, n);
  return await tn(u, u.childSubtreeAvailability, h, n), u;
}
async function tn(e, t, n, s) {
  const r = Number.isFinite(t.bitstream) ? t.bitstream : t.bufferView;
  if (typeof r != "number")
    return;
  const i = e.bufferViews[r], o = e.buffers[i.buffer];
  if (!(s != null && s.baseUrl))
    throw new Error("Url is not provided");
  if (!s.fetch)
    throw new Error("fetch is not provided");
  if (o.uri) {
    const c = `${(s == null ? void 0 : s.baseUrl) || ""}/${o.uri}`, l = await (await s.fetch(c)).arrayBuffer();
    t.explicitBitstream = new Uint8Array(l, i.byteOffset, i.byteLength);
    return;
  }
  const a = e.buffers.slice(0, i.buffer).reduce((c, u) => c + u.byteLength, 0);
  t.explicitBitstream = new Uint8Array(n.slice(a, a + o.byteLength), i.byteOffset, i.byteLength);
}
function Oi(e) {
  const t = new DataView(e), n = t.getUint32(0, !0), s = t.getUint32(4, !0);
  return n + 2 ** 32 * s;
}
const Ta = {
  id: "3d-tiles-subtree",
  name: "3D Tiles Subtree",
  module: "3d-tiles",
  version: Vo,
  extensions: ["subtree"],
  mimeTypes: ["application/octet-stream"],
  tests: ["subtree"],
  parse: kg,
  options: {}
};
/**
 * @license
 * Copyright 2009 The Closure Library Authors
 * Copyright 2020 Daniel Wirtz / The long.js Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var gt = null;
try {
  gt = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch {
}
function P(e, t, n) {
  this.low = e | 0, this.high = t | 0, this.unsigned = !!n;
}
P.prototype.__isLong__;
Object.defineProperty(P.prototype, "__isLong__", { value: !0 });
function et(e) {
  return (e && e.__isLong__) === !0;
}
function vi(e) {
  var t = Math.clz32(e & -e);
  return e ? 31 - t : t;
}
P.isLong = et;
var xi = {}, Li = {};
function qt(e, t) {
  var n, s, r;
  return t ? (e >>>= 0, (r = 0 <= e && e < 256) && (s = Li[e], s) ? s : (n = L(e, 0, !0), r && (Li[e] = n), n)) : (e |= 0, (r = -128 <= e && e < 128) && (s = xi[e], s) ? s : (n = L(e, e < 0 ? -1 : 0, !1), r && (xi[e] = n), n));
}
P.fromInt = qt;
function pt(e, t) {
  if (isNaN(e))
    return t ? vt : bt;
  if (t) {
    if (e < 0)
      return vt;
    if (e >= Ea)
      return wa;
  } else {
    if (e <= -Ui)
      return ct;
    if (e + 1 >= Ui)
      return _a;
  }
  return e < 0 ? pt(-e, t).neg() : L(e % ce | 0, e / ce | 0, t);
}
P.fromNumber = pt;
function L(e, t, n) {
  return new P(e, t, n);
}
P.fromBits = L;
var Bn = Math.pow;
function er(e, t, n) {
  if (e.length === 0)
    throw Error("empty string");
  if (typeof t == "number" ? (n = t, t = !1) : t = !!t, e === "NaN" || e === "Infinity" || e === "+Infinity" || e === "-Infinity")
    return t ? vt : bt;
  if (n = n || 10, n < 2 || 36 < n)
    throw RangeError("radix");
  var s;
  if ((s = e.indexOf("-")) > 0)
    throw Error("interior hyphen");
  if (s === 0)
    return er(e.substring(1), t, n).neg();
  for (var r = pt(Bn(n, 8)), i = bt, o = 0; o < e.length; o += 8) {
    var a = Math.min(8, e.length - o), c = parseInt(e.substring(o, o + a), n);
    if (a < 8) {
      var u = pt(Bn(n, a));
      i = i.mul(u).add(pt(c));
    } else
      i = i.mul(r), i = i.add(pt(c));
  }
  return i.unsigned = t, i;
}
P.fromString = er;
function wt(e, t) {
  return typeof e == "number" ? pt(e, t) : typeof e == "string" ? er(e, t) : L(e.low, e.high, typeof t == "boolean" ? t : e.unsigned);
}
P.fromValue = wt;
var Gi = 65536, jg = 1 << 24, ce = Gi * Gi, Ea = ce * ce, Ui = Ea / 2, Pi = qt(jg), bt = qt(0);
P.ZERO = bt;
var vt = qt(0, !0);
P.UZERO = vt;
var oe = qt(1);
P.ONE = oe;
var ba = qt(1, !0);
P.UONE = ba;
var Rs = qt(-1);
P.NEG_ONE = Rs;
var _a = L(-1, 2147483647, !1);
P.MAX_VALUE = _a;
var wa = L(-1, -1, !0);
P.MAX_UNSIGNED_VALUE = wa;
var ct = L(0, -2147483648, !1);
P.MIN_VALUE = ct;
var B = P.prototype;
B.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
B.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * ce + (this.low >>> 0) : this.high * ce + (this.low >>> 0);
};
B.toString = function(t) {
  if (t = t || 10, t < 2 || 36 < t)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative())
    if (this.eq(ct)) {
      var n = pt(t), s = this.div(n), r = s.mul(n).sub(this);
      return s.toString(t) + r.toInt().toString(t);
    } else
      return "-" + this.neg().toString(t);
  for (var i = pt(Bn(t, 6), this.unsigned), o = this, a = ""; ; ) {
    var c = o.div(i), u = o.sub(c.mul(i)).toInt() >>> 0, l = u.toString(t);
    if (o = c, o.isZero())
      return l + a;
    for (; l.length < 6; )
      l = "0" + l;
    a = "" + l + a;
  }
};
B.getHighBits = function() {
  return this.high;
};
B.getHighBitsUnsigned = function() {
  return this.high >>> 0;
};
B.getLowBits = function() {
  return this.low;
};
B.getLowBitsUnsigned = function() {
  return this.low >>> 0;
};
B.getNumBitsAbs = function() {
  if (this.isNegative())
    return this.eq(ct) ? 64 : this.neg().getNumBitsAbs();
  for (var t = this.high != 0 ? this.high : this.low, n = 31; n > 0 && !(t & 1 << n); n--)
    ;
  return this.high != 0 ? n + 33 : n + 1;
};
B.isZero = function() {
  return this.high === 0 && this.low === 0;
};
B.eqz = B.isZero;
B.isNegative = function() {
  return !this.unsigned && this.high < 0;
};
B.isPositive = function() {
  return this.unsigned || this.high >= 0;
};
B.isOdd = function() {
  return (this.low & 1) === 1;
};
B.isEven = function() {
  return (this.low & 1) === 0;
};
B.equals = function(t) {
  return et(t) || (t = wt(t)), this.unsigned !== t.unsigned && this.high >>> 31 === 1 && t.high >>> 31 === 1 ? !1 : this.high === t.high && this.low === t.low;
};
B.eq = B.equals;
B.notEquals = function(t) {
  return !this.eq(
    /* validates */
    t
  );
};
B.neq = B.notEquals;
B.ne = B.notEquals;
B.lessThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) < 0;
};
B.lt = B.lessThan;
B.lessThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) <= 0;
};
B.lte = B.lessThanOrEqual;
B.le = B.lessThanOrEqual;
B.greaterThan = function(t) {
  return this.comp(
    /* validates */
    t
  ) > 0;
};
B.gt = B.greaterThan;
B.greaterThanOrEqual = function(t) {
  return this.comp(
    /* validates */
    t
  ) >= 0;
};
B.gte = B.greaterThanOrEqual;
B.ge = B.greaterThanOrEqual;
B.compare = function(t) {
  if (et(t) || (t = wt(t)), this.eq(t))
    return 0;
  var n = this.isNegative(), s = t.isNegative();
  return n && !s ? -1 : !n && s ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1;
};
B.comp = B.compare;
B.negate = function() {
  return !this.unsigned && this.eq(ct) ? ct : this.not().add(oe);
};
B.neg = B.negate;
B.add = function(t) {
  et(t) || (t = wt(t));
  var n = this.high >>> 16, s = this.high & 65535, r = this.low >>> 16, i = this.low & 65535, o = t.high >>> 16, a = t.high & 65535, c = t.low >>> 16, u = t.low & 65535, l = 0, h = 0, f = 0, d = 0;
  return d += i + u, f += d >>> 16, d &= 65535, f += r + c, h += f >>> 16, f &= 65535, h += s + a, l += h >>> 16, h &= 65535, l += n + o, l &= 65535, L(f << 16 | d, l << 16 | h, this.unsigned);
};
B.subtract = function(t) {
  return et(t) || (t = wt(t)), this.add(t.neg());
};
B.sub = B.subtract;
B.multiply = function(t) {
  if (this.isZero())
    return this;
  if (et(t) || (t = wt(t)), gt) {
    var n = gt.mul(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return L(n, gt.get_high(), this.unsigned);
  }
  if (t.isZero())
    return this.unsigned ? vt : bt;
  if (this.eq(ct))
    return t.isOdd() ? ct : bt;
  if (t.eq(ct))
    return this.isOdd() ? ct : bt;
  if (this.isNegative())
    return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
  if (t.isNegative())
    return this.mul(t.neg()).neg();
  if (this.lt(Pi) && t.lt(Pi))
    return pt(this.toNumber() * t.toNumber(), this.unsigned);
  var s = this.high >>> 16, r = this.high & 65535, i = this.low >>> 16, o = this.low & 65535, a = t.high >>> 16, c = t.high & 65535, u = t.low >>> 16, l = t.low & 65535, h = 0, f = 0, d = 0, A = 0;
  return A += o * l, d += A >>> 16, A &= 65535, d += i * l, f += d >>> 16, d &= 65535, d += o * u, f += d >>> 16, d &= 65535, f += r * l, h += f >>> 16, f &= 65535, f += i * u, h += f >>> 16, f &= 65535, f += o * c, h += f >>> 16, f &= 65535, h += s * l + r * u + i * c + o * a, h &= 65535, L(d << 16 | A, h << 16 | f, this.unsigned);
};
B.mul = B.multiply;
B.divide = function(t) {
  if (et(t) || (t = wt(t)), t.isZero())
    throw Error("division by zero");
  if (gt) {
    if (!this.unsigned && this.high === -2147483648 && t.low === -1 && t.high === -1)
      return this;
    var n = (this.unsigned ? gt.div_u : gt.div_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return L(n, gt.get_high(), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? vt : bt;
  var s, r, i;
  if (this.unsigned) {
    if (t.unsigned || (t = t.toUnsigned()), t.gt(this))
      return vt;
    if (t.gt(this.shru(1)))
      return ba;
    i = vt;
  } else {
    if (this.eq(ct)) {
      if (t.eq(oe) || t.eq(Rs))
        return ct;
      if (t.eq(ct))
        return oe;
      var o = this.shr(1);
      return s = o.div(t).shl(1), s.eq(bt) ? t.isNegative() ? oe : Rs : (r = this.sub(t.mul(s)), i = s.add(r.div(t)), i);
    } else if (t.eq(ct))
      return this.unsigned ? vt : bt;
    if (this.isNegative())
      return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
    if (t.isNegative())
      return this.div(t.neg()).neg();
    i = bt;
  }
  for (r = this; r.gte(t); ) {
    s = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));
    for (var a = Math.ceil(Math.log(s) / Math.LN2), c = a <= 48 ? 1 : Bn(2, a - 48), u = pt(s), l = u.mul(t); l.isNegative() || l.gt(r); )
      s -= c, u = pt(s, this.unsigned), l = u.mul(t);
    u.isZero() && (u = oe), i = i.add(u), r = r.sub(l);
  }
  return i;
};
B.div = B.divide;
B.modulo = function(t) {
  if (et(t) || (t = wt(t)), gt) {
    var n = (this.unsigned ? gt.rem_u : gt.rem_s)(
      this.low,
      this.high,
      t.low,
      t.high
    );
    return L(n, gt.get_high(), this.unsigned);
  }
  return this.sub(this.div(t).mul(t));
};
B.mod = B.modulo;
B.rem = B.modulo;
B.not = function() {
  return L(~this.low, ~this.high, this.unsigned);
};
B.countLeadingZeros = function() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
B.clz = B.countLeadingZeros;
B.countTrailingZeros = function() {
  return this.low ? vi(this.low) : vi(this.high) + 32;
};
B.ctz = B.countTrailingZeros;
B.and = function(t) {
  return et(t) || (t = wt(t)), L(this.low & t.low, this.high & t.high, this.unsigned);
};
B.or = function(t) {
  return et(t) || (t = wt(t)), L(this.low | t.low, this.high | t.high, this.unsigned);
};
B.xor = function(t) {
  return et(t) || (t = wt(t)), L(this.low ^ t.low, this.high ^ t.high, this.unsigned);
};
B.shiftLeft = function(t) {
  return et(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? L(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : L(0, this.low << t - 32, this.unsigned);
};
B.shl = B.shiftLeft;
B.shiftRight = function(t) {
  return et(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? L(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : L(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
B.shr = B.shiftRight;
B.shiftRightUnsigned = function(t) {
  return et(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t < 32 ? L(this.low >>> t | this.high << 32 - t, this.high >>> t, this.unsigned) : t === 32 ? L(this.high, 0, this.unsigned) : L(this.high >>> t - 32, 0, this.unsigned);
};
B.shru = B.shiftRightUnsigned;
B.shr_u = B.shiftRightUnsigned;
B.rotateLeft = function(t) {
  var n;
  return et(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? L(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, L(this.low << t | this.high >>> n, this.high << t | this.low >>> n, this.unsigned)) : (t -= 32, n = 32 - t, L(this.high << t | this.low >>> n, this.low << t | this.high >>> n, this.unsigned));
};
B.rotl = B.rotateLeft;
B.rotateRight = function(t) {
  var n;
  return et(t) && (t = t.toInt()), (t &= 63) === 0 ? this : t === 32 ? L(this.high, this.low, this.unsigned) : t < 32 ? (n = 32 - t, L(this.high << n | this.low >>> t, this.low << n | this.high >>> t, this.unsigned)) : (t -= 32, n = 32 - t, L(this.low << n | this.high >>> t, this.high << n | this.low >>> t, this.unsigned));
};
B.rotr = B.rotateRight;
B.toSigned = function() {
  return this.unsigned ? L(this.low, this.high, !1) : this;
};
B.toUnsigned = function() {
  return this.unsigned ? this : L(this.low, this.high, !0);
};
B.toBytes = function(t) {
  return t ? this.toBytesLE() : this.toBytesBE();
};
B.toBytesLE = function() {
  var t = this.high, n = this.low;
  return [
    n & 255,
    n >>> 8 & 255,
    n >>> 16 & 255,
    n >>> 24,
    t & 255,
    t >>> 8 & 255,
    t >>> 16 & 255,
    t >>> 24
  ];
};
B.toBytesBE = function() {
  var t = this.high, n = this.low;
  return [
    t >>> 24,
    t >>> 16 & 255,
    t >>> 8 & 255,
    t & 255,
    n >>> 24,
    n >>> 16 & 255,
    n >>> 8 & 255,
    n & 255
  ];
};
P.fromBytes = function(t, n, s) {
  return s ? P.fromBytesLE(t, n) : P.fromBytesBE(t, n);
};
P.fromBytesLE = function(t, n) {
  return new P(
    t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24,
    t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24,
    n
  );
};
P.fromBytesBE = function(t, n) {
  return new P(
    t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7],
    t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3],
    n
  );
};
const Kg = 16;
function Ma(e) {
  e === "X" && (e = "");
  const t = e.padEnd(Kg, "0");
  return P.fromString(t, !0, 16);
}
function zg(e) {
  if (e.isZero())
    return "X";
  let t = e.countTrailingZeros();
  const n = t % 4;
  t = (t - n) / 4;
  const s = t;
  t *= 4;
  const i = e.shiftRightUnsigned(t).toString(16).replace(/0+$/, "");
  return Array(17 - s - i.length).join("0") + i;
}
function Wg(e, t) {
  const n = Xg(e).shiftRightUnsigned(2);
  return e.add(P.fromNumber(2 * t + 1 - 4).multiply(n));
}
function Xg(e) {
  return e.and(e.not().add(1));
}
const Qg = 3, qg = 30, Yg = 2 * qg + 1, Ni = 180 / Math.PI;
function $g(e) {
  if (e.length === 0)
    throw new Error(`Invalid Hilbert quad key ${e}`);
  const t = e.split("/"), n = parseInt(t[0], 10), s = t[1], r = s.length;
  let i = 0;
  const o = [0, 0];
  for (let a = r - 1; a >= 0; a--) {
    i = r - a;
    const c = s[a];
    let u = 0, l = 0;
    c === "1" ? l = 1 : c === "2" ? (u = 1, l = 1) : c === "3" && (u = 1);
    const h = Math.pow(2, i - 1);
    tp(h, o, u, l), o[0] += h * u, o[1] += h * l;
  }
  if (n % 2 === 1) {
    const a = o[0];
    o[0] = o[1], o[1] = a;
  }
  return {
    face: n,
    ij: o,
    level: i
  };
}
function Zg(e) {
  if (e.isZero())
    return "";
  let t = e.toString(2);
  for (; t.length < Qg + Yg; )
    t = "0" + t;
  const n = t.lastIndexOf("1"), s = t.substring(0, 3), r = t.substring(3, n), i = r.length / 2, o = P.fromString(s, !0, 2).toString(10);
  let a = "";
  if (i !== 0)
    for (a = P.fromString(r, !0, 2).toString(4); a.length < i; )
      a = "0" + a;
  return `${o}/${a}`;
}
function Ra(e, t, n) {
  const s = 1 << t;
  return [(e[0] + n[0]) / s, (e[1] + n[1]) / s];
}
function Hi(e) {
  return e >= 0.5 ? 1 / 3 * (4 * e * e - 1) : 1 / 3 * (1 - 4 * (1 - e) * (1 - e));
}
function Ia(e) {
  return [Hi(e[0]), Hi(e[1])];
}
function Sa(e, t) {
  let [n, s] = t;
  switch (e) {
    case 0:
      return [1, n, s];
    case 1:
      return [-n, 1, s];
    case 2:
      return [-n, -s, 1];
    case 3:
      return [-1, -s, -n];
    case 4:
      return [s, -1, -n];
    case 5:
      return [s, n, -1];
    default:
      throw new Error("Invalid face");
  }
}
function Da(e) {
  let [t, n, s] = e;
  const r = Math.atan2(s, Math.sqrt(t * t + n * n));
  return [Math.atan2(n, t) * Ni, r * Ni];
}
function tp(e, t, n, s) {
  if (s === 0) {
    n === 1 && (t[0] = e - 1 - t[0], t[1] = e - 1 - t[1]);
    const r = t[0];
    t[0] = t[1], t[1] = r;
  }
}
function ep(e) {
  const t = Ra(e.ij, e.level, [0.5, 0.5]), n = Ia(t), s = Sa(e.face, n);
  return Da(s);
}
const np = 100;
function Ji(e) {
  const {
    face: t,
    ij: n,
    level: s
  } = e, r = [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]], i = Math.max(1, Math.ceil(np * Math.pow(2, -s))), o = new Float64Array(4 * i * 2 + 2);
  let a = 0, c = 0;
  for (let u = 0; u < 4; u++) {
    const l = r[u].slice(0), h = r[u + 1], f = (h[0] - l[0]) / i, d = (h[1] - l[1]) / i;
    for (let A = 0; A < i; A++) {
      l[0] += f, l[1] += d;
      const g = Ra(n, s, l), p = Ia(g), y = Sa(t, p), _ = Da(y);
      Math.abs(_[1]) > 89.999 && (_[0] = c);
      const b = _[0] - c;
      _[0] += b > 180 ? -360 : b < -180 ? 360 : 0, o[a++] = _[0], o[a++] = _[1], c = _[0];
    }
  }
  return o[a++] = o[0], o[a++] = o[1], o;
}
function nr(e) {
  const t = sp(e);
  return $g(t);
}
function sp(e) {
  if (e.indexOf("/") > 0)
    return e;
  const t = Ma(e);
  return Zg(t);
}
function rp(e) {
  const t = nr(e);
  return ep(t);
}
function ip(e) {
  let t;
  if (e.face === 2 || e.face === 5) {
    let n = null, s = 0;
    for (let r = 0; r < 4; r++) {
      const i = `${e.face}/${r}`, o = nr(i), a = Ji(o);
      (typeof n > "u" || n === null) && (n = new Float64Array(4 * a.length)), n.set(a, s), s += a.length;
    }
    t = Vi(n);
  } else {
    const n = Ji(e);
    t = Vi(n);
  }
  return t;
}
function Vi(e) {
  if (e.length % 2 !== 0)
    throw new Error("Invalid corners");
  const t = [], n = [];
  for (let s = 0; s < e.length; s += 2)
    t.push(e[s]), n.push(e[s + 1]);
  return t.sort((s, r) => s - r), n.sort((s, r) => s - r), {
    west: t[0],
    east: t[t.length - 1],
    north: n[n.length - 1],
    south: n[0]
  };
}
function op(e, t) {
  const n = (t == null ? void 0 : t.minimumHeight) || 0, s = (t == null ? void 0 : t.maximumHeight) || 0, r = nr(e), i = ip(r), o = i.west, a = i.south, c = i.east, u = i.north, l = [];
  return l.push(new m(o, u, n)), l.push(new m(c, u, n)), l.push(new m(c, a, n)), l.push(new m(o, a, n)), l.push(new m(o, u, s)), l.push(new m(c, u, s)), l.push(new m(c, a, s)), l.push(new m(o, a, s)), l;
}
function Fa(e) {
  const t = e.token, n = {
    minimumHeight: e.minimumHeight,
    maximumHeight: e.maximumHeight
  }, s = op(t, n), r = rp(t), i = r[0], o = r[1], a = H.WGS84.cartographicToCartesian([i, o, n.maximumHeight]), c = new m(a[0], a[1], a[2]);
  s.push(c);
  const u = Ff(s);
  return [...u.center, ...u.halfAxes];
}
const ap = 4, cp = 8, up = {
  QUADTREE: ap,
  OCTREE: cp
};
function lp(e, t, n) {
  if (e != null && e.box) {
    const s = Ma(e.s2VolumeInfo.token), r = Wg(s, t), i = zg(r), o = {
      ...e.s2VolumeInfo
    };
    switch (o.token = i, n) {
      case "OCTREE":
        const u = e.s2VolumeInfo, l = u.maximumHeight - u.minimumHeight, h = l / 2, f = u.minimumHeight + l / 2;
        u.minimumHeight = f - h, u.maximumHeight = f + h;
        break;
    }
    return {
      box: Fa(o),
      s2VolumeInfo: o
    };
  }
}
async function Oa(e) {
  const {
    implicitOptions: t,
    parentData: n = {
      mortonIndex: 0,
      x: 0,
      y: 0,
      z: 0
    },
    childIndex: s = 0,
    s2VolumeBox: r,
    loaderOptions: i
  } = e;
  let {
    subtree: o,
    level: a = 0,
    globalData: c = {
      level: 0,
      mortonIndex: 0,
      x: 0,
      y: 0,
      z: 0
    }
  } = e;
  const {
    subdivisionScheme: u,
    subtreeLevels: l,
    maximumLevel: h,
    contentUrlTemplate: f,
    subtreesUriTemplate: d,
    basePath: A
  } = t, g = {
    children: [],
    lodMetricValue: 0,
    contentUrl: ""
  };
  if (!h)
    return ho.once(`Missing 'maximumLevel' or 'availableLevels' property. The subtree ${f} won't be loaded...`), g;
  const p = a + c.level;
  if (p > h)
    return g;
  const y = up[u], _ = Math.log2(y), b = s & 1, w = s >> 1 & 1, M = s >> 2 & 1, C = (y ** a - 1) / (y - 1);
  let D = kt(n.mortonIndex, s, _), F = C + D, I = kt(n.x, b, 1), S = kt(n.y, w, 1), V = kt(n.z, M, 1), W = !1;
  a >= l && (W = us(o.childSubtreeAvailability, D));
  const k = kt(c.x, I, a), O = kt(c.y, S, a), st = kt(c.z, V, a);
  if (W) {
    const yt = `${A}/${d}`, $t = Is(yt, p, k, O, st);
    o = await Fe($t, Ta, i), c = {
      mortonIndex: D,
      x: I,
      y: S,
      z: V,
      level: a
    }, D = 0, F = 0, I = 0, S = 0, V = 0, a = 0;
  }
  if (!us(o.tileAvailability, F))
    return g;
  us(o.contentAvailability, F) && (g.contentUrl = Is(f, p, k, O, st));
  const Gt = a + 1, ut = {
    mortonIndex: D,
    x: I,
    y: S,
    z: V
  };
  for (let yt = 0; yt < y; yt++) {
    const $t = lp(r, yt, u), Ut = await Oa({
      subtree: o,
      implicitOptions: t,
      loaderOptions: i,
      parentData: ut,
      childIndex: yt,
      level: Gt,
      globalData: {
        ...c
      },
      s2VolumeBox: $t
    });
    if (Ut.contentUrl || Ut.children.length) {
      const Le = p + 1, v = hp(Ut, Le, {
        childTileX: I,
        childTileY: S,
        childTileZ: V
      }, t, r);
      g.children.push(v);
    }
  }
  return g;
}
function us(e, t) {
  let n;
  return Array.isArray(e) ? (n = e[0], e.length > 1 && ho.once('Not supported extension "3DTILES_multiple_contents" has been detected')) : n = e, "constant" in n ? !!n.constant : n.explicitBitstream ? mp(t, n.explicitBitstream) : !1;
}
function hp(e, t, n, s, r) {
  const {
    basePath: i,
    refine: o,
    getRefine: a,
    lodMetricType: c,
    getTileType: u,
    rootLodMetricValue: l,
    rootBoundingVolume: h
  } = s, f = e.contentUrl && e.contentUrl.replace(`${i}/`, ""), d = l / 2 ** t, A = r != null && r.box ? {
    box: r.box
  } : h, g = fp(t, A, n);
  return {
    children: e.children,
    contentUrl: e.contentUrl,
    content: {
      uri: f
    },
    id: e.contentUrl,
    refine: a(o),
    type: u(e),
    lodMetricType: c,
    lodMetricValue: d,
    geometricError: d,
    transform: e.transform,
    boundingVolume: g
  };
}
function fp(e, t, n) {
  if (t.region) {
    const {
      childTileX: s,
      childTileY: r,
      childTileZ: i
    } = n, [o, a, c, u, l, h] = t.region, f = 2 ** e, d = (c - o) / f, A = (u - a) / f, g = (h - l) / f, [p, y] = [o + d * s, o + d * (s + 1)], [_, b] = [a + A * r, a + A * (r + 1)], [w, M] = [l + g * i, l + g * (i + 1)];
    return {
      region: [p, _, y, b, w, M]
    };
  }
  if (t.box)
    return t;
  throw new Error(`Unsupported bounding volume type ${t}`);
}
function kt(e, t, n) {
  return (e << n) + t;
}
function Is(e, t, n, s, r) {
  const i = dp({
    level: t,
    x: n,
    y: s,
    z: r
  });
  return e.replace(/{level}|{x}|{y}|{z}/gi, (o) => i[o]);
}
function dp(e) {
  const t = {};
  for (const n in e)
    t[`{${n}}`] = e[n];
  return t;
}
function mp(e, t) {
  const n = Math.floor(e / 8), s = e % 8;
  return (t[n] >> s & 1) === 1;
}
function sr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (!t)
    return jt.EMPTY;
  const s = t.split("?")[0].split(".").pop();
  switch (s) {
    case "pnts":
      return jt.POINTCLOUD;
    case "i3dm":
    case "b3dm":
    case "glb":
    case "gltf":
      return jt.SCENEGRAPH;
    default:
      return s || jt.EMPTY;
  }
}
function rr(e) {
  switch (e) {
    case "REPLACE":
    case "replace":
      return xt.REPLACE;
    case "ADD":
    case "add":
      return xt.ADD;
    default:
      return e;
  }
}
function Ss(e, t) {
  if (/^[a-z][0-9a-z+.-]*:/i.test(t)) {
    const s = new URL(e, `${t}/`);
    return decodeURI(s.toString());
  } else if (e.startsWith("/"))
    return e;
  return zc(t, e);
}
function ki(e, t) {
  if (!e)
    return null;
  let n;
  if (e.content) {
    var s;
    const i = e.content.uri || ((s = e.content) === null || s === void 0 ? void 0 : s.url);
    typeof i < "u" && (n = Ss(i, t));
  }
  return {
    ...e,
    id: n,
    contentUrl: n,
    lodMetricType: wn.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: sr(e, n),
    refine: rr(e.refine)
  };
}
async function Ap(e, t, n) {
  let s = null;
  const r = Ki(e.root);
  r && e.root ? s = await ji(e.root, e, t, r, n) : s = ki(e.root, t);
  const i = [];
  for (i.push(s); i.length > 0; ) {
    const o = i.pop() || {}, a = o.children || [], c = [];
    for (const u of a) {
      const l = Ki(u);
      let h;
      l ? h = await ji(u, e, t, l, n) : h = ki(u, t), h && (c.push(h), i.push(h));
    }
    o.children = c;
  }
  return s;
}
async function ji(e, t, n, s, r) {
  var i, o, a;
  const {
    subdivisionScheme: c,
    maximumLevel: u,
    availableLevels: l,
    subtreeLevels: h,
    subtrees: {
      uri: f
    }
  } = s, d = Is(f, 0, 0, 0, 0), A = Ss(d, n), g = await Fe(A, Ta, r), p = (i = e.content) === null || i === void 0 ? void 0 : i.uri, y = p ? Ss(p, n) : "", _ = t == null || (o = t.root) === null || o === void 0 ? void 0 : o.refine, b = e.geometricError, w = (a = e.boundingVolume.extensions) === null || a === void 0 ? void 0 : a["3DTILES_bounding_volume_S2"];
  if (w) {
    const F = {
      box: Fa(w),
      s2VolumeInfo: w
    };
    e.boundingVolume = F;
  }
  const M = e.boundingVolume, C = {
    contentUrlTemplate: y,
    subtreesUriTemplate: f,
    subdivisionScheme: c,
    subtreeLevels: h,
    maximumLevel: Number.isFinite(l) ? l - 1 : u,
    refine: _,
    basePath: n,
    lodMetricType: wn.GEOMETRIC_ERROR,
    rootLodMetricValue: b,
    rootBoundingVolume: M,
    getTileType: sr,
    getRefine: rr
  };
  return await gp(e, n, g, C, r);
}
async function gp(e, t, n, s, r) {
  if (!e)
    return null;
  const {
    children: i,
    contentUrl: o
  } = await Oa({
    subtree: n,
    implicitOptions: s,
    loaderOptions: r
  });
  let a, c = null;
  return o && (a = o, c = {
    uri: o.replace(`${t}/`, "")
  }), {
    ...e,
    id: a,
    contentUrl: a,
    lodMetricType: wn.GEOMETRIC_ERROR,
    lodMetricValue: e.geometricError,
    transformMatrix: e.transform,
    type: sr(e, a),
    refine: rr(e.refine),
    content: c || e.content,
    children: i
  };
}
function Ki(e) {
  var t;
  return (e == null || (t = e.extensions) === null || t === void 0 ? void 0 : t["3DTILES_implicit_tiling"]) || (e == null ? void 0 : e.implicitTiling);
}
const be = {
  id: "3d-tiles",
  name: "3D Tiles",
  module: "3d-tiles",
  version: Vo,
  extensions: ["cmpt", "pnts", "b3dm", "i3dm"],
  mimeTypes: ["application/octet-stream"],
  tests: ["cmpt", "pnts", "b3dm", "i3dm"],
  parse: pp,
  options: {
    "3d-tiles": {
      loadGLTF: !0,
      decodeQuantizedPositions: !1,
      isTileset: "auto",
      assetGltfUpAxis: null
    }
  }
};
async function pp(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const s = t["3d-tiles"] || {};
  let r;
  return s.isTileset === "auto" ? r = (n == null ? void 0 : n.url) && n.url.indexOf(".json") !== -1 : r = s.isTileset, r ? Bp(e, t, n) : yp(e, t, n);
}
async function Bp(e, t, n) {
  var s;
  const r = JSON.parse(new TextDecoder().decode(e)), i = (n == null ? void 0 : n.url) || "", o = Cp(i), a = await Ap(r, o, t || {});
  return {
    ...r,
    shape: "tileset3d",
    loader: be,
    url: i,
    queryString: (n == null ? void 0 : n.queryString) || "",
    basePath: o,
    root: a || r.root,
    type: dt.TILES3D,
    lodMetricType: wn.GEOMETRIC_ERROR,
    lodMetricValue: ((s = r.root) === null || s === void 0 ? void 0 : s.geometricError) || 0
  };
}
async function yp(e, t, n) {
  const s = {
    content: {
      shape: "tile3d",
      featureIds: null
    }
  };
  return await Ca(e, 0, t, n, s.content), s.content;
}
function Cp(e) {
  return Os(e);
}
const va = "https://api.cesium.com/v1/assets";
async function Tp(e, t) {
  if (!t) {
    const i = await Ep(e);
    for (const o of i.items)
      o.type === "3DTILES" && (t = o.id);
  }
  const n = await bp(e, t), {
    type: s,
    url: r
  } = n;
  return U(s === "3DTILES" && r), n.headers = {
    Authorization: `Bearer ${n.accessToken}`
  }, n;
}
async function Ep(e) {
  U(e);
  const t = va, n = {
    Authorization: `Bearer ${e}`
  }, s = await _e(t, {
    headers: n
  });
  if (!s.ok)
    throw new Error(s.statusText);
  return await s.json();
}
async function bp(e, t) {
  U(e, t);
  const n = {
    Authorization: `Bearer ${e}`
  }, s = `${va}/${t}`;
  let r = await _e(`${s}`, {
    headers: n
  });
  if (!r.ok)
    throw new Error(r.statusText);
  let i = await r.json();
  if (r = await _e(`${s}/endpoint`, {
    headers: n
  }), !r.ok)
    throw new Error(r.statusText);
  const o = await r.json();
  return i = {
    ...i,
    ...o
  }, i;
}
async function _p(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  t = t["cesium-ion"] || {};
  const {
    accessToken: n
  } = t;
  let s = t.assetId;
  if (!Number.isFinite(s)) {
    const r = e.match(/\/([0-9]+)\/tileset.json/);
    s = r && r[1];
  }
  return Tp(n, s);
}
const xa = {
  ...be,
  id: "cesium-ion",
  name: "Cesium Ion",
  preload: _p,
  parse: async (e, t, n) => (t = {
    ...t
  }, t["3d-tiles"] = t["cesium-ion"], t.loader = xa, be.parse(e, t, n)),
  options: {
    "cesium-ion": {
      ...be.options["3d-tiles"],
      accessToken: null
    }
  }
};
function wp(e) {
  let t = 0;
  for (const s in e.attributes) {
    const r = e.getAttribute(s);
    t += r.count * r.itemSize * r.array.BYTES_PER_ELEMENT;
  }
  const n = e.getIndex();
  return t += n ? n.count * n.itemSize * n.array.BYTES_PER_ELEMENT : 0, t;
}
function La(e) {
  const n = document.createElement("canvas");
  n.width = 64, n.height = 64;
  const s = n.getContext("2d");
  s.rect(0, 0, 64, 64);
  const r = s.createLinearGradient(0, 0, 64, 64);
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    r.addColorStop(a[0], "#" + a[1].getHexString());
  }
  s.fillStyle = r, s.fill();
  const i = new Va(n);
  return i.needsUpdate = !0, i.minFilter = ka, i.wrapS = ar, i.wrapT = ar, i.repeat.set(2, 2), i;
}
function zi(e) {
  e.updateMatrix(), e.updateMatrixWorld(), e.matrixWorldInverse.copy(e.matrixWorld).invert();
  const t = new ja();
  return t.setFromProjectionMatrix(new Q().multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)), t;
}
function Mp(e) {
  const t = new en(), n = new Ka(10, 5), s = new nt(...e.projectPointOntoPlane([0, 0, 0])), r = new nt(e.normal.x, e.normal.y, e.normal.z), i = new nt().copy(s).add(r);
  n.lookAt(i), n.translate(s.x, s.y, s.z);
  const o = new Qi({ color: 65535, side: za }), a = new qi(n, o), c = new Wa(r, s, 5, 16776960);
  return t.add(c), t.add(a), t;
}
function Wi(e) {
  const { boundingVolume: t } = e;
  let n = 0;
  e.content && (n = Math.min(e.content.byteLength / 5e5, 1));
  const s = new T(n, 1, 0), r = new Xa(1, 1, 1), i = new Q();
  t.halfAxes ? i.copy(Ga(t.halfAxes)) : t.radius && r.scale(t.radius * 2, t.radius * 2, t.radius * 2), r.applyMatrix4(i);
  const o = new Qa(r), a = new qa(o, new Ya({ color: s }));
  return a.position.copy(new nt(...t.center)), a;
}
function Ga(e) {
  const t = e;
  return new Q().fromArray([
    t[0] * 2,
    t[1] * 2,
    t[2] * 2,
    0,
    t[3] * 2,
    t[4] * 2,
    t[5] * 2,
    0,
    t[6] * 2,
    t[7] * 2,
    t[8] * 2,
    0,
    0,
    0,
    0,
    1
  ]);
}
function Rp(e, t) {
  const r = 2 * Math.PI * 6378137 / 2, i = t * r / 180;
  let o = Math.log(Math.tan((90 + e) * Math.PI / 360)) / (Math.PI / 180);
  return o = o * r / 180, new Yi(i, o);
}
function Ip(e) {
  let t = 0;
  if (e.userData.mimeType == "image/ktx2" && e.mipmaps) {
    for (let n = 0; n < e.mipmaps.length; n++)
      t += e.mipmaps[n].data.byteLength;
    return t;
  } else if (e.image) {
    const { image: n } = e, s = 4;
    let r = [n.width, n.height];
    for (; r[0] > 1 || r[1] > 1; )
      t += r[0] * r[1] * s, r[0] = Math.max(Math.floor(r[0] / 2), 1), r[1] = Math.max(Math.floor(r[1] / 2), 1);
    return t += 1 * 1 * s, t;
  } else
    return;
}
function Ua(e) {
  return wp(e);
}
const Pa = {
  // From chroma spectral http://gka.github.io/chroma.js/
  SPECTRAL: [
    [0, new T(0.3686, 0.3098, 0.6353)],
    [0.1, new T(0.1961, 0.5333, 0.7412)],
    [0.2, new T(0.4, 0.7608, 0.6471)],
    [0.3, new T(0.6706, 0.8667, 0.6431)],
    [0.4, new T(0.902, 0.9608, 0.5961)],
    [0.5, new T(1, 1, 0.749)],
    [0.6, new T(0.9961, 0.8784, 0.5451)],
    [0.7, new T(0.9922, 0.6824, 0.3804)],
    [0.8, new T(0.9569, 0.4275, 0.2627)],
    [0.9, new T(0.8353, 0.2431, 0.3098)],
    [1, new T(0.6196, 39e-4, 0.2588)]
  ],
  PLASMA: [
    [0, new T(0.241, 0.015, 0.61)],
    [0.1, new T(0.387, 1e-3, 0.654)],
    [0.2, new T(0.524, 0.025, 0.653)],
    [0.3, new T(0.651, 0.125, 0.596)],
    [0.4, new T(0.752, 0.227, 0.513)],
    [0.5, new T(0.837, 0.329, 0.431)],
    [0.6, new T(0.907, 0.435, 0.353)],
    [0.7, new T(0.963, 0.554, 0.272)],
    [0.8, new T(0.992, 0.681, 0.195)],
    [0.9, new T(0.987, 0.822, 0.144)],
    [1, new T(0.94, 0.975, 0.131)]
  ],
  YELLOW_GREEN: [
    [0, new T(0.1647, 0.2824, 0.3451)],
    [0.1, new T(0.1338, 0.3555, 0.4227)],
    [0.2, new T(0.061, 0.4319, 0.4864)],
    [0.3, new T(0, 0.5099, 0.5319)],
    [0.4, new T(0, 0.5881, 0.5569)],
    [0.5, new T(0.137, 0.665, 0.5614)],
    [0.6, new T(0.2906, 0.7395, 0.5477)],
    [0.7, new T(0.4453, 0.8099, 0.5201)],
    [0.8, new T(0.6102, 0.8748, 0.485)],
    [0.9, new T(0.7883, 0.9323, 0.4514)],
    [1, new T(0.9804, 0.9804, 0.4314)]
  ],
  VIRIDIS: [
    [0, new T(0.267, 5e-3, 0.329)],
    [0.1, new T(0.283, 0.141, 0.458)],
    [0.2, new T(0.254, 0.265, 0.53)],
    [0.3, new T(0.207, 0.372, 0.553)],
    [0.4, new T(0.164, 0.471, 0.558)],
    [0.5, new T(0.128, 0.567, 0.551)],
    [0.6, new T(0.135, 0.659, 0.518)],
    [0.7, new T(0.267, 0.749, 0.441)],
    [0.8, new T(0.478, 0.821, 0.318)],
    [0.9, new T(0.741, 0.873, 0.15)],
    [1, new T(0.993, 0.906, 0.144)]
  ],
  INFERNO: [
    [0, new T(0.077, 0.042, 0.206)],
    [0.1, new T(0.225, 0.036, 0.388)],
    [0.2, new T(0.373, 0.074, 0.432)],
    [0.3, new T(0.522, 0.128, 0.42)],
    [0.4, new T(0.665, 0.182, 0.37)],
    [0.5, new T(0.797, 0.255, 0.287)],
    [0.6, new T(0.902, 0.364, 0.184)],
    [0.7, new T(0.969, 0.516, 0.063)],
    [0.8, new T(0.988, 0.683, 0.072)],
    [0.9, new T(0.961, 0.859, 0.298)],
    [1, new T(0.988, 0.998, 0.645)]
  ],
  GRAYSCALE: [
    [0, new T(0, 0, 0)],
    [1, new T(1, 1, 1)]
  ],
  // 16 samples of the TURBU color scheme
  // values taken from: https://gist.github.com/mikhailov-work/ee72ba4191942acecc03fe6da94fc73f
  // original file licensed under Apache-2.0
  TURBO: [
    [0, new T(0.18995, 0.07176, 0.23217)],
    [0.07, new T(0.25107, 0.25237, 0.63374)],
    [0.13, new T(0.27628, 0.42118, 0.89123)],
    [0.2, new T(0.25862, 0.57958, 0.99876)],
    [0.27, new T(0.15844, 0.73551, 0.92305)],
    [0.33, new T(0.09267, 0.86554, 0.7623)],
    [0.4, new T(0.19659, 0.94901, 0.59466)],
    [0.47, new T(0.42778, 0.99419, 0.38575)],
    [0.53, new T(0.64362, 0.98999, 0.23356)],
    [0.6, new T(0.80473, 0.92452, 0.20459)],
    [0.67, new T(0.93301, 0.81236, 0.22667)],
    [0.73, new T(0.99314, 0.67408, 0.20348)],
    [0.8, new T(0.9836, 0.49291, 0.12849)],
    [0.87, new T(0.92105, 0.31489, 0.05475)],
    [0.93, new T(0.81608, 0.18462, 0.01809)],
    [1, new T(0.66449, 0.08436, 424e-5)]
  ],
  RAINBOW: [
    [0, new T(0.278, 0, 0.714)],
    [1 / 6, new T(0, 0, 1)],
    [2 / 6, new T(0, 1, 1)],
    [3 / 6, new T(0, 1, 0)],
    [4 / 6, new T(1, 1, 0)],
    [5 / 6, new T(1, 0.64, 0)],
    [1, new T(1, 0, 0)]
  ],
  CONTOUR: [
    [0, new T(0, 0, 0)],
    [0.03, new T(0, 0, 0)],
    [0.04, new T(1, 1, 1)],
    [1, new T(1, 1, 1)]
  ]
}, Sp = `
  varying vec3 vColor;
  uniform float alpha;

  void main() {
    if (vColor == vec3(0.0, 0.0, 0.0)) {
      discard;
    } else {
      gl_FragColor = vec4( vColor, alpha);
    }
  }
`, Dp = `
  varying vec3 vColor;
  uniform sampler2D gradient;
  uniform sampler2D grayscale;
  attribute float intensity;
  attribute float classification;
  uniform vec3 rootCenter;
  uniform vec3 rootNormal;
  uniform vec2 elevationRange;
  uniform int coloring;
  uniform bool hideGround;
  uniform float maxIntensity;
  uniform float intensityContrast;
  uniform float pointSize;

  #ifdef USE_COLOR
  vec3 getRGB() {
      vec3 rgb = color;
      return rgb;
  }
  #endif

  vec3 getElevation(){
    vec4 world = modelMatrix * vec4( position, 1.0 );
    float diff = abs(dot(rootNormal, (vec3(world) - rootCenter)));
    float w = max(diff - elevationRange.x,0.0) / max(elevationRange.y - elevationRange.x,1.0);
    vec3 cElevation = texture2D(gradient, vec2(w,1.0-w)).rgb;

    return cElevation;
  }

  vec3 getIntensity(){
    // TODO: real contrast enhancement. Check https://github.com/yuki-koyama/enhancer/blob/master/shaders/enhancer.fs
    float intmod = pow(intensity, intensityContrast);
    vec3 cIntensity = texture2D(grayscale, vec2(intmod / maxIntensity ,1.0-(intmod / maxIntensity))).rgb;
    return cIntensity;
  }

  vec3 getClassification(){
    float classNormalized = classification / 255.0;
    vec3 cClassification = texture2D(gradient, vec2(classNormalized * 5.0,1.0-classNormalized * 5.0)).rgb;
    return cClassification;
  }

  vec3 getColor(){
      vec3 color;
      if (hideGround && classification == 2.0) {
         return vec3(0.0, 0.0, 0.0);               
      }

      if (coloring == 1) {
        color = getIntensity();
      }
      else if (coloring == 2) {
        color = getClassification();
      } else if (coloring == 3) {
        color = getElevation();
      } 
      #ifdef USE_COLOR
      else if (coloring == 4) {
        color = getRGB();
      }
      #endif
      else {
        color = vec3(1.0, 1.0, 1.0);
      }
      return color;
  }

  void main() {
      vColor = getColor();

      gl_PointSize = pointSize;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
`;
var Na = /* @__PURE__ */ ((e) => (e[e.Intensity = 1] = "Intensity", e[e.Classification = 2] = "Classification", e[e.Elevation = 3] = "Elevation", e[e.RGB = 4] = "RGB", e[e.White = 5] = "White", e))(Na || {}), yn = /* @__PURE__ */ ((e) => (e[e.FlatTexture = 1] = "FlatTexture", e[e.ShadedTexture = 2] = "ShadedTexture", e[e.ShadedNoTexture = 3] = "ShadedNoTexture", e))(yn || {}), Rt = /* @__PURE__ */ ((e) => (e[e.Reset = 1] = "Reset", e[e.Mercator = 2] = "Mercator", e[e.WGS84Cartesian = 3] = "WGS84Cartesian", e))(Rt || {});
const Fp = Pa.RAINBOW, Op = typeof document < "u" ? La(Fp) : null, vp = Pa.GRAYSCALE, xp = typeof document < "u" ? La(vp) : null, Lp = {
  throttleRequests: !0,
  maxRequests: 64,
  updateInterval: 0.1,
  maxConcurrency: 1,
  maximumScreenSpaceError: 16,
  memoryAdjustedScreenSpaceError: !0,
  maximumMemoryUsage: 400,
  memoryCacheOverflow: 128,
  viewDistanceScale: 1,
  skipLevelOfDetail: !1,
  updateTransforms: !0,
  shading: yn.FlatTexture,
  transparent: !1,
  pointCloudColoring: Na.White,
  pointSize: 1,
  worker: !0,
  wireframe: !1,
  debug: !1,
  gltfLoader: null,
  basisTranscoderPath: null,
  dracoDecoderPath: null,
  material: null,
  computeNormals: !1,
  shaderCallback: null,
  geoTransform: Rt.Reset,
  preloadTilesCount: null
};
class kp {
  /**
  * Loads a tileset of 3D Tiles according to the given {@link LoaderProps}
  * @public
  *
  * @param props - Properties for this load call {@link LoaderProps}.
  * @returns An object containing the 3D Model to be added to the scene
  * and a runtime engine to be updated every frame.
  */
  static async load(t) {
    const n = { ...Lp, ...t.options }, { url: s } = t, r = n.updateInterval, i = 5, o = {};
    if (n.cesiumIONToken) {
      o["cesium-ion"] = {
        accessToken: n.cesiumIONToken
      };
      const E = await xa.preload(s, o);
      o.fetch = { headers: E.headers };
    }
    n.googleApiKey && (o.fetch = { headers: { "X-GOOG-API-KEY": n.googleApiKey } }), t.loadingManager && t.loadingManager.itemStart(s);
    const a = await Fe(s, be, {
      ...o
    }), c = {}, u = {}, l = [], h = new en(), f = new en();
    n.debug || (f.visible = !1);
    const d = {
      pointSize: { type: "f", value: n.pointSize },
      gradient: { type: "t", value: Op },
      grayscale: { type: "t", value: xp },
      rootCenter: { type: "vec3", value: new nt() },
      rootNormal: { type: "vec3", value: new nt() },
      coloring: { type: "i", value: n.pointCloudColoring },
      hideGround: { type: "b", value: !0 },
      elevationRange: { type: "vec2", value: new Yi(0, 400) },
      maxIntensity: { type: "f", value: 1 },
      intensityContrast: { type: "f", value: 1 },
      alpha: { type: "f", value: 1 }
    }, A = new $a({
      uniforms: d,
      vertexShader: Dp,
      fragmentShader: Sp,
      transparent: n.transparent,
      vertexColors: !0
    });
    let g = null, p = 0, y, _, b;
    n.gltfLoader ? y = n.gltfLoader : (y = new sc(), n.basisTranscoderPath && (_ = new ic(), _.detectSupport(t.renderer), _.setTranscoderPath(n.basisTranscoderPath + "/"), _.setWorkerLimit(1), y.setKTX2Loader(_)), n.dracoDecoderPath && (b = new rc(), b.setDecoderPath(n.dracoDecoderPath + "/"), b.setWorkerLimit(n.maxConcurrency), y.setDRACOLoader(b)));
    const w = new Qi({ transparent: n.transparent }), M = {
      maximumMemoryUsage: n.maximumMemoryUsage,
      maximumScreenSpaceError: n.maximumScreenSpaceError,
      memoryAdjustedScreenSpaceError: n.memoryAdjustedScreenSpaceError,
      memoryCacheOverflow: n.memoryCacheOverflow,
      viewDistanceScale: n.viewDistanceScale,
      skipLevelOfDetail: n.skipLevelOfDetail,
      updateTransforms: n.updateTransforms,
      throttleRequests: n.throttleRequests,
      maxRequests: n.maxRequests,
      contentLoader: async (E) => {
        let v = null;
        switch (E.type) {
          case jt.POINTCLOUD: {
            v = Up(E, A, n, yt);
            break;
          }
          case jt.SCENEGRAPH:
          case jt.MESH: {
            v = await Gp(y, E, w, n, yt);
            break;
          }
        }
        if (v && (v.visible = !1, c[E.id] = v, h.add(c[E.id]), n.debug)) {
          const Y = Wi(E);
          f.add(Y), u[E.id] = Y;
        }
      },
      onTileLoad: async (E) => {
        C && (n.geoTransform == Rt.Reset && !S && (E == null ? void 0 : E.depth) <= i && $t(E), Yt = !0);
      },
      onTileUnload: (E) => {
        l.push(E);
      },
      onTileError: (E, v) => {
        console.error("Tile error", E.id, v);
      }
    }, C = new ad(a, {
      ...M,
      loadOptions: {
        ...o,
        maxConcurrency: n.maxConcurrency,
        worker: n.worker,
        gltf: {
          loadImages: !1
        },
        "3d-tiles": {
          loadGLTF: !1
        }
      }
    }), D = new Q(), F = new Q(), I = new nt();
    let S = !1;
    if (C.root.boundingVolume ? (C.root.header.boundingVolume.region && (console.warn("Cannot apply a model matrix to bounding volumes of type region. Tileset stays in original geo-coordinates."), n.geoTransform = Rt.WGS84Cartesian), F.setPosition(
      C.root.boundingVolume.center[0],
      C.root.boundingVolume.center[1],
      C.root.boundingVolume.center[2]
    )) : console.warn("Bounding volume not found, no transformations applied"), n.debug) {
      const E = Wi(C.root);
      f.add(E), u[C.root.id] = E;
    }
    let V = !1, W = !1;
    d.rootCenter.value.copy(I), d.rootNormal.value.copy(new nt(0, 0, 1).normalize()), C.stats.get("Loader concurrency").count = n.maxConcurrency, C.stats.get("Maximum mem usage").count = n.maximumMemoryUsage;
    let k = 0, O = null, st = null, Yt = !1;
    const ue = new nt(1 / 0, 1 / 0, 1 / 0);
    let Gt = null;
    h.updateMatrixWorld(!0);
    const ut = new Q().copy(h.matrixWorld), yt = new Q().copy(ut).invert();
    if ((n.geoTransform == Rt.Reset || n.geoTransform == Rt.Mercator) && ($t(C.root), Ut()), n.debug && (u[C.root.id].applyMatrix4(D), f.matrixWorld.copy(h.matrixWorld)), n.geoTransform == Rt.Mercator) {
      const E = Rp(
        C.cartographicCenter[1],
        C.cartographicCenter[0]
      );
      I.set(
        E.x,
        0,
        -E.y
      ), h.position.copy(I), h.updateMatrixWorld(!0);
    } else
      n.geoTransform == Rt.WGS84Cartesian && (h.applyMatrix4(F), h.updateMatrixWorld(!0), I.copy(h.position));
    function $t(E) {
      if (!E.boundingVolume.halfAxes)
        return;
      const v = E.boundingVolume.halfAxes, Y = new Q().extractRotation(Ga(v)).premultiply(new Q().extractRotation(yt));
      if (!new Fn().setFromRotationMatrix(Y).equals(new Fn())) {
        S = !0;
        const Ct = new nt(
          F.elements[12],
          F.elements[13],
          F.elements[14]
        );
        F.extractRotation(Y), F.setPosition(Ct), Ut();
      }
    }
    function Ut() {
      D.copy(F).invert(), D.premultiply(ut), D.copy(ut).multiply(new Q().copy(F).invert()), C.modelMatrix = new N(D.toArray());
    }
    function Le(E, v, Y, z) {
      if (V)
        return;
      if (!Gt || z.aspect != st) {
        if (z instanceof $i)
          Gt = new dn({
            fov: z.fov / 180 * Math.PI,
            aspectRatio: z.aspect,
            near: z.near,
            far: z.far
          }).sseDenominator;
        else if (z instanceof Za) {
          const j = z.right - z.left, Ja = z.top - z.bottom;
          Gt = Math.max(j, Ja);
        }
        st = z.aspect, n.debug && console.log("Updated sse denonimator:", Gt);
      }
      const Ge = zi(z).planes.map((j) => new $(j.normal.toArray(), j.constant)), Ha = new at(Ge), ir = {
        camera: {
          position: ue.toArray()
        },
        height: Y,
        frameNumber: E._frameNumber,
        sseDenominator: Gt,
        cullingVolume: Ha,
        viewport: {
          id: 0
        }
      };
      E._cache.reset(), E._traverser.traverse(E.root, ir, E.options);
      for (const j of E.tiles)
        j.selected ? v[j.id] ? v[j.id].visible = !0 : console.error("TILE SELECTED BUT NOT LOADED!!", j.id) : v[j.id] && (v[j.id].visible = !1);
      for (; l.length > 0; ) {
        const j = l.pop();
        v[j.id] && j.contentState == it.UNLOADED && (h.remove(v[j.id]), ls(v[j.id]), delete v[j.id]), u[j.id] && (ls(u[j.id]), f.remove(u[j.id]), delete u[j.id]);
      }
      const Dn = E.stats.get("Tiles Loaded").count, or = E.stats.get("Tiles Loading").count;
      return t.onProgress && t.onProgress(
        Dn,
        Dn + or
      ), t.loadingManager && !W && or == 0 && (n.preloadTilesCount == null || Dn >= n.preloadTilesCount) && (W = !0, t.loadingManager.itemEnd(t.url)), ir;
    }
    return {
      model: h,
      runtime: {
        getTileset: () => C,
        getStats: () => C.stats,
        showTiles: (E) => {
          f.visible = E;
        },
        setWireframe: (E) => {
          n.wireframe = E, h.traverse((v) => {
            v instanceof qi && (v.material.wireframe = E);
          });
        },
        setDebug: (E) => {
          n.debug = E, f.visible = E;
        },
        setShading: (E) => {
          n.shading = E;
        },
        getTileBoxes: () => f,
        setViewDistanceScale: (E) => {
          C.options.viewDistanceScale = E, C._frameNumber++, Le(C, c, p, g);
        },
        setHideGround: (E) => {
          d.hideGround.value = E;
        },
        setPointCloudColoring: (E) => {
          d.coloring.value = E;
        },
        setElevationRange: (E) => {
          d.elevationRange.value.set(E[0], E[1]);
        },
        setMaxIntensity: (E) => {
          d.maxIntensity.value = E;
        },
        setIntensityContrast: (E) => {
          d.intensityContrast.value = E;
        },
        setPointAlpha: (E) => {
          d.alpha.value = E;
        },
        getLatLongHeightFromPosition: (E) => {
          const v = C.ellipsoid.cartesianToCartographic(
            new nt().copy(E).applyMatrix4(new Q().copy(D).invert()).toArray()
          );
          return {
            lat: v[1],
            long: v[0],
            height: v[2]
          };
        },
        getPositionFromLatLongHeight: (E) => {
          const v = C.ellipsoid.cartographicToCartesian([
            ds(E.long),
            ds(E.lat),
            E.height
          ]);
          return new nt(...v).applyMatrix4(D);
        },
        orientToGeocoord: (E) => {
          const v = [E.long, E.lat, E.height], Y = C.ellipsoid.cartographicToCartesian(v), z = new Q().fromArray(C.ellipsoid.eastNorthUpToFixedFrame(Y)), Ct = new Q().makeRotationFromEuler(
            new Fn(Math.PI / 2, Math.PI / 2, 0)
          ), Ge = new Q().copy(z).multiply(Ct).invert();
          C.modelMatrix = new N(Ge.toArray()), h.applyMatrix4(Ge), h.updateMatrixWorld(!0);
        },
        getCameraFrustum: (E) => {
          const Y = zi(E).planes.map((Ct) => new $(Ct.normal.toArray(), Ct.constant)).map((Ct) => Mp(Ct)), z = new en();
          for (const Ct of Y)
            z.add(Ct);
          return z;
        },
        update: function(E, v, Y) {
          if (g = Y, p = v, k += E, C && k >= r) {
            if (!ut.equals(h.matrixWorld)) {
              k = 0, ut.copy(h.matrixWorld), (n.geoTransform == Rt.Reset || n.geoTransform == Rt.Mercator) && Ut();
              const z = new nt().setFromMatrixPosition(ut);
              d.rootCenter.value.copy(z), d.rootNormal.value.copy(new nt(0, 0, 1).applyMatrix4(ut).normalize()), yt.copy(ut).invert(), n.debug && (u[C.root.id].matrixWorld.copy(D), u[C.root.id].applyMatrix4(ut));
            }
            O == null ? O = new Q().copy(Y.matrixWorld) : (Yt || Pp(Y, O, st)) && (k = 0, Yt = !1, C._frameNumber++, Y.getWorldPosition(ue), O.copy(Y.matrixWorld), Le(C, c, p, Y));
          }
        },
        dispose: function() {
          for (V = !0, C._destroy(); h.children.length > 0; ) {
            const E = h.children[0];
            ls(E), h.remove(E);
          }
          for (; f.children.length > 0; ) {
            const E = f.children[0];
            f.remove(E), E.geometry.dispose(), E.material.dispose();
          }
          _ && _.dispose(), b && b.dispose();
        }
      }
    };
  }
}
async function Gp(e, t, n, s, r) {
  return new Promise((i, o) => {
    const a = new Q().makeRotationAxis(new nt(1, 0, 0), Math.PI / 2), c = t.content.gltfUpAxis !== "Z", u = new Q().fromArray(t.computedTransform).premultiply(r);
    c && u.multiply(a), t.content.byteLength || (t.content.byteLength = t.content.gltfArrayBuffer.byteLength), e.parse(
      t.content.gltfArrayBuffer,
      t.contentUrl ? t.contentUrl.substr(0, t.contentUrl.lastIndexOf("/") + 1) : "",
      (l) => {
        const h = l.scenes[0];
        h.applyMatrix4(u), t.content.texturesByteLength = 0, t.content.geometriesByteLength = 0, h.traverse((f) => {
          if (f.type == "Mesh") {
            const d = f;
            t.content.geometriesByteLength += Ua(d.geometry);
            const A = d.material, g = A.map, p = Ip(g);
            p && (t.content.texturesByteLength += p), s.material ? (d.material = s.material.clone(), A.dispose()) : s.shading == yn.FlatTexture && (d.material = n.clone(), A.dispose()), s.shading != yn.ShadedNoTexture ? d.material.type == "ShaderMaterial" ? d.material.uniforms.map = { value: g } : d.material.map = g : (g && g.dispose(), d.material.map = null), s.shaderCallback && (d.onBeforeRender = (y, _, b, w, M, C) => {
              s.shaderCallback(y, M);
            }), d.material.wireframe = s.wireframe, s.computeNormals && d.geometry.computeVertexNormals();
          }
        }), t.content.gpuMemoryUsageInBytes = t.content.texturesByteLength + t.content.geometriesByteLength, i(h);
      },
      (l) => {
        o(new Error(`error parsing gltf in tile ${t.id}: ${l}`));
      }
    );
  });
}
function Up(e, t, n, s) {
  const r = {
    rtc_center: e.content.rtcCenter,
    // eslint-disable-line camelcase
    points: e.content.attributes.positions,
    intensities: e.content.attributes.intensity,
    classifications: e.content.attributes.classification,
    rgb: null,
    rgba: null
  }, { colors: i } = e.content.attributes;
  i && i.size === 3 && (r.rgb = i.value), i && i.size === 4 && (r.rgba = i.value);
  const o = new tc();
  o.setAttribute("position", new cr(r.points, 3));
  const a = new Q().fromArray(e.computedTransform).premultiply(s);
  r.rgba ? o.setAttribute("color", new cr(r.rgba, 4)) : r.rgb && o.setAttribute("color", new ur(r.rgb, 3, !0)), r.intensities && o.setAttribute(
    "intensity",
    // Handles both 16bit or 8bit intensity values
    new ec(r.intensities, 1, !0)
  ), r.classifications && o.setAttribute("classification", new ur(r.classifications, 1, !1)), e.content.geometriesByteLength = Ua(o), e.content.gpuMemoryUsageInBytes = e.content.geometriesByteLength;
  const c = new nc(o, n.material || t);
  if (r.rtc_center) {
    const u = r.rtc_center;
    a.multiply(new Q().makeTranslation(u[0], u[1], u[2]));
  }
  return c.applyMatrix4(a), c;
}
function Xi(e) {
  var t, n, s, r;
  (t = e == null ? void 0 : e.uniforms) != null && t.map ? (s = (n = e == null ? void 0 : e.uniforms) == null ? void 0 : n.map.value) == null || s.dispose() : e.map && ((r = e.map) == null || r.dispose()), e.dispose();
}
function ls(e) {
  e.traverse((t) => {
    if (t.isMesh)
      if (t.geometry.dispose(), t.material.isMaterial)
        Xi(t.material);
      else
        for (const n of t.material)
          Xi(n);
  });
  for (let t = e.children.length - 1; t >= 0; t--) {
    const n = e.children[t];
    e.remove(n);
  }
}
function Pp(e, t, n) {
  const s = !e.matrixWorld.equals(t);
  return e instanceof $i ? s || e.aspect !== n : s;
}
export {
  Rt as GeoTransform,
  kp as Loader3DTiles,
  Na as PointCloudColoring,
  yn as Shading
};
