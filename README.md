<<<<<<< HEAD
# ☁️ API NestJS Drive — Gerenciador de Armazenamento de Arquivos

Bem-vindo à documentação oficial do **NestJS Drive**! Esta é uma API REST robusta desenvolvida para simular serviços profissionais de armazenamento em nuvem (como um mini Google Drive). 

O sistema foi projetado com foco em segurança de backend, implementando regras severas de validação de payloads, controle físico de arquivos gravados em disco rígido (no diretório local `./drive`) e tratamento padronizado de exceções HTTP seguindo as especificações da W3C.

---

## 🛠️ Tecnologias e Dependências Utilizadas

O projeto foi estruturado utilizando o ecossistema moderno do ecossistema Node.js:
* **Framework Core:** NestJS (v10) — Arquitetura modular altamente escalável baseada em Pipes, Interceptors, Controllers e Services.
* **Linguagem:** TypeScript — Segurança através de tipagem estática e prevenção de bugs em tempo de compilação.
* **Middleware de Upload:** Multer (via `@nestjs/platform-express`) — Motor responsável por interceptar e decodificar streams de dados do tipo `multipart/form-data`.
* **Manipulação de Arquivos:** Módulos nativos do Node.js (`fs` e `path`) — Utilizados para ler, validar a existência e remover arquivos do disco do servidor de forma síncrona e segura.

---

## 📂 Estrutura de Pastas do Projeto

Para facilitar a navegação de desenvolvedores e avaliadores pelo código-fonte, a árvore do repositório está organizada da seguinte forma:

```text
UPLOAD2/
├── drive/                  # 💾 Diretório local físico onde os arquivos válidos são salvos
├── src/
│   ├── arquivo/            # 📦 Módulo isolado de escopo de arquivos
│   │   ├── dto/            # Data Transfer Objects (Objetos de transferência e validação)
│   │   ├── arquivo.controller.ts # 🌐 Rotas e validações do POST (Tamanho/Formato)
│   │   ├── arquivo.service.ts    # ⚙️ Lógica de listagem (GET) e exclusão física (DELETE)
│   │   └── arquivo.module.ts     # Configuração e injeção de dependências do módulo
│   ├── app.module.ts       # Módulo centralizador (raiz) da aplicação
│   └── main.ts             # Arquivo de inicialização (Bootstrapping do servidor)
└── README.md               # Documentação oficial do projeto (Este arquivo)
