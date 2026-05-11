const techIconMap: Record<string, string> = {
  react: "devicon-react-original",
  reactjs: "devicon-react-original",
  vue: "devicon-vuejs-plain",
  vuejs: "devicon-vuejs-plain",
  angular: "devicon-angularjs-plain",
  javascript: "devicon-javascript-plain",
  typescript: "devicon-typescript-plain",
  node: "devicon-nodejs-plain",
  nodejs: "devicon-nodejs-plain",
  python: "devicon-python-plain",
  java: "devicon-java-plain",
  go: "devicon-go-original-wordmark",
  golang: "devicon-go-original-wordmark",
  rust: "devicon-rust-original",
  ruby: "devicon-ruby-plain",
  php: "devicon-php-plain",
  csharp: "devicon-csharp-plain",
  c: "devicon-c-plain",
  cpp: "devicon-cplusplus-plain",
  kotlin: "devicon-kotlin-plain",
  swift: "devicon-swift-plain",
  scala: "devicon-scala-plain",
  dart: "devicon-dart-plain",
  flutter: "devicon-flutter-plain",
  html: "devicon-html5-plain",
  css: "devicon-css3-plain",
  sass: "devicon-sass-original",
  tailwind: "devicon-tailwindcss-original",
  tailwindcss: "devicon-tailwindcss-original",
  bootstrap: "devicon-bootstrap-plain",
  jquery: "devicon-jquery-plain",
  next: "devicon-nextjs-original",
  nextjs: "devicon-nextjs-original",
  nuxt: "devicon-nuxtjs-plain",
  express: "devicon-express-original",
  django: "devicon-django-plain",
  flask: "devicon-flask-original",
  spring: "devicon-spring-plain",
  springboot: "devicon-spring-plain",
  laravel: "devicon-laravel-original",
  symfony: "devicon-symfony-original",
  rails: "devicon-rails-plain",
  mysql: "devicon-mysql-plain",
  postgresql: "devicon-postgresql-plain",
  postgres: "devicon-postgresql-plain",
  mongodb: "devicon-mongodb-plain",
  redis: "devicon-redis-plain",
  sql: "devicon-azuresqldatabase-plain",
  docker: "devicon-docker-plain",
  kubernetes: "devicon-kubernetes-plain",
  aws: "devicon-amazonwebservices-original",
  azure: "devicon-azure-plain",
  gcp: "devicon-googlecloud-plain",
  firebase: "devicon-firebase-plain",
  git: "devicon-git-plain",
  github: "devicon-github-original",
  gitlab: "devicon-gitlab-plain",
  figma: "devicon-figma-plain",
  webpack: "devicon-webpack-plain",
  vite: "devicon-vitejs-original",
  jest: "devicon-jest-plain",
  mocha: "devicon-mocha-plain",
  terraform: "devicon-terraform-plain",
  graphql: "devicon-graphql-plain",
  redux: "devicon-redux-original",
  svelte: "devicon-svelte-plain",
  electron: "devicon-electron-original",
  wordpress: "devicon-wordpress-plain",
  drupal: "devicon-drupal-plain",
  ssh: "devicon-ssh-original",
  linux: "devicon-linux-plain",
  ubuntu: "devicon-ubuntu-plain",
  yarn: "devicon-yarn-plain",
  npm: "devicon-npm-original-wordmark",
  deno: "devicon-denojs-original",
  unity: "devicon-unity-original",
  android: "devicon-android-plain",
  apple: "devicon-apple-original",
  bash: "devicon-bash-plain",
  tomcat: "devicon-tomcat-line",
  dotnet: "devicon-dotnetcore-plain",
  "dotnet core": "devicon-dotnetcore-plain",
  ".net": "devicon-dotnetcore-plain",
  nginx: "devicon-nginx-original",
  jenkins: "devicon-jenkins-line",
  ansible: "devicon-ansible-plain",
  prometheus: "devicon-prometheus-original",
  grafana: "devicon-grafana-original",
  elasticsearch: "devicon-elasticsearch-plain",
  kafka: "devicon-apachekafka-original",
  matlab: "devicon-matlab-plain",
  r: "devicon-r-plain",
  haskell: "devicon-haskell-plain",
  elixir: "devicon-elixir-plain",
  erlang: "devicon-erlang-plain",
  fortran: "devicon-fortran-plain",
  xano: "devicon-xano-plain",
  strapi: "devicon-strapi-plain",
}

const reverseMap = new Map<string, string>()
  for (const [, icon] of Object.entries(techIconMap)) {
  const name = icon.replace("devicon-", "").replace("-plain", "").replace("-original", "").replace("-wordmark", "")
  if (!reverseMap.has(name)) reverseMap.set(name, icon)
}

export function getIconForTech(techName: string): string | null {
  const lower = techName.toLowerCase()
  if (techIconMap[lower]) return techIconMap[lower]
  for (const [key, icon] of Object.entries(techIconMap)) {
    if (lower.includes(key) || key.includes(lower)) return icon
  }
  for (const [, icon] of reverseMap) {
    const clean = icon.replace("devicon-", "").replace("-plain", "").replace("-original", "").replace("-wordmark", "")
    if (lower.includes(clean)) return icon
  }
  return null
}

export function findTechIcons(techStack: string): string[] {
  if (!techStack || techStack === "Not specified") return []
  const techs = techStack.toLowerCase().split(/[,/()]+/).map(t => t.trim())
  const found: string[] = []
  for (const tech of techs) {
    for (const [key, icon] of Object.entries(techIconMap)) {
      if (tech.includes(key) && !found.includes(icon)) {
        found.push(icon)
      }
    }
  }
  return found.slice(0, 6)
}

export function extractTechList(techStack: string): string[] {
  if (!techStack || techStack === "Not specified") return []
  return techStack.split(/[,/()]+/).map(t => t.trim()).filter(t => t.length > 0)
}
