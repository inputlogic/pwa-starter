export default function workerize (name, ...args) {
  const worker = new window.Worker(`workers/${name}.js`)
  const promise = new Promise((resolve, reject) => {
    worker.onmessage = ev => resolve(ev.data)
    worker.postMessage({args})
  })
  return {worker, promise}
}
