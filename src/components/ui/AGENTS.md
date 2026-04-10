# Padrões de Criação de Componentes UI

Este arquivo serve como documentação de guia de estilos para criar e padronizar os novos componentes de interface dentro do diretório `/src/components/ui/`. Nosso objetivo é garantir flexibilidade, tipagem estrita no TypeScript e fácil criação de variantes de tema com Tailwind V4.

## Regras de Estrutura:

1. **Named Exports:** Nunca utilize `export default`. Exporte tanto a interface quanto o componente com chaves nomeadas (`export const ComponentName = ...` e `export interface ComponentNameProps`).
2. **tailwind-variants:** Para todas as estilizações de estado, responsividade ou variações visuais (variantes), utilize a função `tv()` advinda do banco `tailwind-variants`, pois ela já engloba comportamentos de fallback do `tailwind-merge` automaticamente.
3. **Extend ComponentProps:** Todo componente base deverá estender propriedades nativas do HTML passando suas propriedades no escopo principal. Por exemplo: estender `ComponentProps<"button">` ou `ComponentProps<"input">`. Em conjunto com os tipos de variantes da lib via `VariantProps<typeof function>`.

## Regras de Estilização (Tailwind V4 + @theme Variables):
- Ao assinar valores como cores, use as classes utilitárias raízes do CSS importadas na configuração `@theme` (`bg-accent-green` ao invés de código hex fixo nas classes). O uso de `var(--...)` se torna dispensável quando essas variáveis são listadas na diretiva `@theme` como nativas de utilitários Tailwind.
- Use os aliases de layout, dimensionamento e font-family seguindo a documentação do projeto.
- Quando uma variante for a de padrão (fallback), sinalize-a no sub-nó `defaultVariants:` na tabela do seu `tv()`.

## Exemplo de Estrutura Inicial Cópia:

```tsx
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const meuComponenteVariants = tv({
  base: "base tailwind classes...",
  variants: {
    variant: {
      default: "classes for default",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface MeuComponenteProps
  extends ComponentProps<"div">,
    VariantProps<typeof meuComponenteVariants> {}

export const MeuComponente = ({ className, variant, ...props }: MeuComponenteProps) => {
  return (
    <div className={meuComponenteVariants({ variant, className })} {...props} />
  );
};
```
