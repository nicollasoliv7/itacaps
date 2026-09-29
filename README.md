# ITACAPS

Site institucional e catálogo por categorias da ITACAPS, em Next.js App Router, React e TypeScript. Preparado para implantação na Vercel.

## Desenvolvimento

Node.js 22 ou superior.

```bash
npm ci
npm run dev
npm run typecheck
npm run build
```

## Publicação na Vercel

Importar `nicollasoliv7/itacaps`, branch `main`, framework **Next.js**, diretório raiz `./`. Usar os comandos padrão (`npm run build`). Nenhuma variável de ambiente é necessária nesta primeira versão.

## Escopo de lançamento

A primeira versão aplica o recorte recomendado na seção 26.1 do briefing: apresentação editorial, navegação e busca de categorias, destaques, localização, contato oficial e páginas individuais de categorias. Não há checkout, conta, sacola, cadastro de newsletter ou estoque fictícios. O CTA VIP conversa com a equipe, sem simular inscrição. Valores, tamanhos, condições de compra e disponibilidade são confirmados no atendimento.

O contato usa o endereço fornecido `https://contate.me/itacaps1`. Para mensagens pré-preenchidas por produto será necessário confirmar o número oficial de WhatsApp.

### Assets e identidade

O arquivo `/public/images/hero.webp` é uma campanha ilustrativa gerada por IA. As demais imagens são referências de estilo do Unsplash, salvas localmente. Todas são identificadas como ilustrativas, inclusive nas páginas de categorias; não representam estoque, clientes ou instalações reais.

Wordmark tipográfico e favicon IC são provisórios. Substituir pelo logo oficial quando o arquivo estiver disponível. Fontes: Barlow Condensed e DM Sans (Google Fonts), hospedadas localmente.

Fontes das imagens:
- Bonés: https://images.unsplash.com/photo-1521369909029-2afed882baee
- Sneakers: https://images.unsplash.com/photo-1542291026-7eec264c27ff
- Camisetas: https://images.unsplash.com/photo-1521572163474-6864f9cf17ab
- Jaquetas: https://images.unsplash.com/photo-1551028719-00167b16eac5
- Perfumaria: https://images.unsplash.com/photo-1541643600914-78b084683601
- Looks: https://images.unsplash.com/photo-1488161628813-04466f872be2

### Evolução com o acervo real

1. Inserir logo e fotos reais autorizadas dos produtos e da loja.
2. Cadastrar itens, preços, variações e disponibilidade reais.
3. Adicionar Shop the Look, editorial e coleção 3D quando existirem as fotos apropriadas.
4. Integrar checkout, contas e newsletter apenas com serviços reais e políticas fornecidas pela empresa.

Não publicar horários, descontos, políticas comerciais ou avaliações inventadas.
