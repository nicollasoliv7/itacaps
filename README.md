# ITACAPS

Site de página única da ITACAPS (Itabirito-MG), em Next.js. Publicado na Vercel a cada push na `main`.

## Seções

- **Abertura:** foto real da loja, chamada para montar o look e falar com a loja.
- **O que tem na loja:** fotos reais das araras, parede de calçados/perfumes e vitrine de óculos.
- **Monte seu look:** o cliente escolhe peças, tamanho, estilo e entrega; o pedido sai pronto para o WhatsApp (componente `components/LookBuilder.tsx`).
- **Venha conhecer:** endereço, mapa e Instagram.

## Configuração

Contatos e listas ficam em `lib/site.ts`.

- `WHATSAPP`: preencha com o número oficial (só dígitos, com 55 e DDD). Com ele, o botão abre o WhatsApp com a mensagem já escrita. Vazio, a mensagem é copiada e o cliente vai para o contate.me.
- `pieces`, `clothingSizes`, `shoeSizes`, `styles`: opções do Monte seu look.

## Desenvolvimento

```bash
npm ci
npm run dev
npm run build
```

## Pendências

- Logo oficial em arquivo (o nome no topo ainda é tipográfico).
- Número oficial de WhatsApp.
- Horário de funcionamento, se quiser exibir.
