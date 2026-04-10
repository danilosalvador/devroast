# Especificação: Implementação de tRPC e React Query

Este documento detalha a implementação da camada de comunicação entre o frontend (Vite) e o banco de dados (Postgres) utilizando tRPC v11 e React Query, garantindo type-safety de ponta a ponta.

## 🧐 Conclusões do Estudo

Para o projeto DevRoast, a combinação de **tRPC** com **React Query** é ideal por:
1.  **Type Safety**: O frontend consome os tipos diretamente do backend sem necessidade de geração de código extra ou esquemas JSON.
2.  **Server State Management**: React Query resolve problemas de cache, revalidação e estados de loading/error de forma robusta.
3.  **Performance**: Utilizaremos o motor da `@trpc/tanstack-react-query` para uma integração nativa.

## 🛠 Arquitetura Proposta

### Camada Server-Side
- **Contexto**: O tRPC terá acesso à instância do Drizzle ORM (`db`) através do contexto da requisição.
- **Procedimentos**: Todos os inputs serão validados com **Zod**.
- **Servidor**: Implementaremos um servidor minimalista (ex: usando Fastify ou um plugin de Vite para API) que expõe o `appRouter`.

### Camada Client-Side
- **Links**: Utilizaremos `httpBatchLink` para agrupar múltiplas requisições em uma única chamada HTTP quando possível.
- **Provider**: Um componente `TRPCProvider` centralizado que encapsula o `QueryClientProvider` e o `trpc.Provider`.

---

## 📋 Especificação Técnica

### Requisitos Funcionais
- [ ] **Configuração tRPC Server**: Inicializar tRPC v11 e definir o contexto com `db`.
- [ ] **App Router**: Criar o roteador principal e roteadores por domínio (ex: `roastRouter`, `leaderboardRouter`).
- [ ] **Zod Validation**: Validar inputs de todos os procedimentos (ex: UUID do roast, código enviado).
- [ ] **React Query Integration**: Configurar o `QueryClient` com defaults otimizados (ex: `staleTime: 5000`).
- [ ] **Hooks Tipados**: Garantir que `trpc.useQuery` e `trpc.useMutation` funcionem com TypeScript no frontend.

### Estrutura de Arquivos
- `src/server/trpc.ts`: Configuração base e middleware do tRPC.
- `src/server/routers/_app.ts`: Roteador raiz.
- `src/server/routers/roast.ts`: Procedimentos relacionados a roasts e ranking.
- `src/lib/trpc.ts`: Configuração do cliente tRPC e definição do hook customizado.
- `src/components/Providers.tsx`: Wrapper de provedores de contexto.

---

## 📝 TO-DO List para Implementação

1.  **Preparação de Dependências**
    *   [ ] Instalar `@trpc/server`, `@trpc/client`, `@trpc/react-query`, `@tanstack/react-query`, `zod`.
2.  **Infraestrutura Backend (tRPC)**
    *   [ ] Criar `src/server/trpc.ts` com o `initTRPC` e o contexto incluindo o Drizzle.
    *   [ ] Definir o `AppRouter` inicial em `src/server/routers/_app.ts`.
    *   [ ] Criar um endpoint/servidor temporário para testes (ou integrar com o dev server do Vite).
3.  **Configuração Frontend**
    *   [ ] Criar `src/lib/trpc.ts` para instanciar o cliente.
    *   [ ] Implementar o `src/components/Providers.tsx`.
    *   [ ] Envolver o `App.tsx` com os provedores.
4.  **Validação de funcionalidade**
    *   [ ] Criar um procedimento simples de "ping" e consumi-lo no frontend para validar a conexão.
