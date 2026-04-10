# Especificação: Editor com Syntax Highlight e Detecção Automática

Este documento detalha o estudo e a especificação técnica para a implementação do novo editor de código da DevRoast, inspirado na arquitetura de ferramentas de alta performance como o **ray.so**.

## 🧐 Conclusões do Estudo

Após analisar implementações de referência (Raycast/ray-so), concluímos que a melhor abordagem para o DevRoast é o padrão de **Overlay Editor**.

### Por que não usar Monaco ou CodeMirror?
Embora o **CodeMirror 6** seja excelente, ele introduz uma complexidade significativa de configuração e peso no bundle. Para o caso de uso do DevRoast (colar código, pequeno ajuste e roast), um editor baseado em `<textarea>` com uma camada de destaque de sintaxe oferece um equilíbrio perfeito entre performance, controle total do design e facilidade de implementação.

---

## 🛠 Arquitetura Proposta

### Componentes do Editor
1.  **Camada de Entrada (Textarea)**:
    *   Um `<textarea>` nativo que lida com a entrada de texto e eventos.
    *   Estilo: `text-transparent`, `bg-transparent`, `caret-text-primary`.
    *   Lógica: Interceptar `Tab` para inserir espaços e gerenciar o `onChange`.

2.  **Camada de Visualização (Shiki Overlay)**:
    *   Uma `div` posicionada exatamente sob o textarea.
    *   Estilo: Renderizada pelo Shiki com o tema **Vesper** (exclusivo).
    *   Sincronização: O scroll e o padding devem ser idênticos aos do textarea.

### Lógica de Detecção de Linguagem
Utilizaremos o **highlight.js** exclusivamente como motor de inferência, enquanto o **Shiki** cuidará da pintura final.
-   **Gatilho**: Instantâneo conforme o typing (real-time), com debounce para performance.
-   **Fluxo**: `Código -> highlight.js (auto-detect) -> ID da Linguagem -> Shiki (re-highlight)`.

---

## 📋 Especificação Técnica

### Requisitos Funcionais
- [x] **Destaque de Sintaxe**: Utilizar estritamente o tema **Vesper**.
- [ ] **Interface de Seleção**: Adicionar um `Select` no cabeçalho do `CodeBlock` permitindo a troca manual entre as linguagens populares.
- [ ] **Linguagens Suportadas**: Lista reduzida e otimizada: `JavaScript`, `TypeScript`, `Python`, `Go`, `Rust`, `Java`, `C#`, `PHP`, `HTML`, `CSS`, `SQL`.
- [ ] **Modo Auto**: Opção padrão "Auto Detect" que utiliza o motor de inferência em tempo real.
- [ ] **Intercepção de Teclas**: Implementar suporte a `Tab` (insere 2 espaços) e manter a indentação ao pressionar `Enter`.
- [ ] **Debounce**: A detecção automática será executada em tempo real com um debounce de ~300ms para garantir fluidez.

### Estrutura de Pastas e Arquivos
- `src/lib/language-detector.ts`: Utilitário para envolver o `highlight.js`.
- `src/components/ui/CodeBlock/editor.tsx`: Refatoração do componente modular.

---

## 📝 TO-DO List para Implementação

1.  **Exploração de Bibliotecas**
    *   [ ] Instalar `shiki/wasm` e `highlight.js`.
2.  **Desenvolvimento do Detector**
    *   [ ] Criar função `detectLanguage(code: string): string` limitada à lista de linguagens populares.
    *   [ ] Implementar lógica de debounce no hook de estado do editor.
3.  **Refatoração do CodeBlock.Editor**
    *   [ ] Implementar sincronização de scroll perfeita.
    *   [ ] Adicionar suporte a tabulação manual e auto-indent.
4.  **UI de Seleção**
    *   [ ] Criar componente `LanguagePicker` (Select) com a lista reduzida.
    *   [ ] Integrar com o estado de `language` do CodeBlock.
