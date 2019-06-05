const environments = {
  development: ['localhost:1234', '127.0.0.1:1234', 'localhost:45678', 'localhost:5000'],
  staging: ['my-app.herokuapp.com'],
  production: ['my-app.co', 'www.my-app.co']
}

export const environment = (() => {
  const host = window.location.host
  const envs = Object.keys(environments)
  for (let x = 0; x < envs.length; x++) {
    let env = envs[x]
    if (environments[env].some(v => v === host)) {
      return env
    }
  }
  throw new Error('No environment matching current url: ' + host)
})()
