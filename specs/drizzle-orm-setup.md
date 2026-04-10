# Especificação: Implementação do Drizzle ORM e Banco de Dados

Este documento detalha o planejamento para a persistência de dados do DevRoast utilizando **Drizzle ORM** com **PostgreSQL**, incluindo o ambiente de desenvolvimento via Docker.

## 🧐 Conclusões do Estudo

Com base no layout atual (Leaderboard) e funcionalidades do `README.md`, identificamos a necessidade de uma estrutura focada em submissões de código e resultados de roasts. O banco será otimizado para inserções rápidas e consultas dinâmicas de ranking.

---

## 🗄 Modelagem de Dados (Schema)

### Enums
- `roast_mode`: `['brutal', 'sarcasm']`
- `language`: `['javascript', 'typescript', 'python', 'go', 'rust', 'java', 'csharp', 'php', 'html', 'css', 'sql']` (conforme especificação do editor).

### Tabelas

#### 1. `roasts` (Tabela Principal)
Armazena cada trecho de código submetido e o resultado gerado pela IA.
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `uuid` | Chave primária (default random). |
| `code_content` | `text` | O código-fonte enviado pelo usuário. |
| `language` | `language_enum` | Linguagem do código (detectada ou manual). |
| `mode` | `roast_mode_enum` | O modo de roast selecionado no momento. |
| `score` | `decimal(3,1)` | Nota de 0.0 a 10.0 gerada pela IA. |
| `roast_text` | `text` | O texto descritivo do roast gerado pela IA. |
| `created_at` | `timestamp` | Data e hora da submissão. |

### Decisões de Arquitetura
- **Anonimato**: Não haverá tabela de usuários; todas as submissões serão anônimas.
- **Visibilidade**: Todas as submissões são públicas por padrão para alimentar o Global Leaderboard.
- **Ranking**: O rank exibido na interface será calculado dinamicamente via query (`ORDER BY score DESC`), garantindo simplicidade e dados sempre atualizados.

---

## 🐳 Infraestrutura (Docker Compose)

Para rodar o PostgreSQL localmente, utilizaremos um arquivo `docker-compose.yml` na raiz:

```yaml
services:
  database:
    image: postgres:16-alpine
    container_name: devroast-db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: password
      POSTGRES_DB: devroast_db
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## 📋 Especificação Técnica

### Tecnologias
- **ORM**: `drizzle-orm`
- **Driver**: `postgres` (postgres.js)
- **Migrações**: `drizzle-kit`
- **Ambiente**: `docker-compose`

### Fluxo de Trabalho
1. Definir o esquema em `src/db/schema.ts`.
2. Utilizar `drizzle-kit` para gerar as migrações SQL.
3. Executar as migrações contra o container Postgres.

---

## 📝 TO-DO List para Implementação

- [ ] **Setup de Ambiente**
  - [ ] Criar `docker-compose.yml`.
  - [ ] Criar arquivo `.env` com a `DATABASE_URL`.
- [ ] **Configuração Drizzle**
  - [ ] Instalar dependências: `drizzle-orm postgres` e `drizzle-kit -D`.
  - [ ] Criar `drizzle.config.ts` na raiz.
- [ ] **Schema e Migrações**
  - [ ] Desenvolver `src/db/schema.ts` com enums e tabela `roasts`.
  - [ ] Gerar migração inicial: `npx drizzle-kit generate`.
  - [ ] Rodar migração: `npx drizzle-kit migrate`.
- [ ] **Conexão**
  - [ ] Criar `src/db/index.ts` para exportar a instância do banco.
