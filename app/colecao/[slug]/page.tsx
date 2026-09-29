import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/catalog";
import { ContactButton, TrustBar } from "@/components/Shared";
export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  return {
    title: c?.name ?? "Coleção",
    description: c
      ? `${c.name} na ITACAPS em Itabirito/MG. ${c.description} Consulte modelos e disponibilidade. Envio para todo o Brasil.`
      : undefined,
  };
}
export default async function Collection({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = categories.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <main id="conteudo" className="collection-page">
      <div className="collection-header">
        <Link href="/#categorias" className="text-link">
          <ArrowLeft size={17} /> VOLTAR ÀS CATEGORIAS
        </Link>
        <span className="eyebrow">ITACAPS / {c.short}</span>
      </div>
      <section className="collection-layout">
        <div className="collection-image">
          <Image
            src={`/images/${c.image}`}
            alt={`Inspiração de ${c.name.toLowerCase()}, fotografia ilustrativa`}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <span className="image-note">
            Imagem ilustrativa de estilo. Não representa o estoque.
          </span>
        </div>
        <div className="collection-copy">
          <span className="eyebrow">SEU PRÓXIMO VISUAL COMEÇA AQUI</span>
          <h1>{c.name.toUpperCase()}</h1>
          <h2>{c.description}</h2>
          <p>{c.body}</p>
          <div className="availability">
            <span className="status-dot" /> ATENDIMENTO PESSOAL, DO SEU JEITO
            <p>
              Valores, tamanhos e disponibilidade são confirmados com a equipe
              antes da compra.
            </p>
          </div>
          <ContactButton>CONSULTAR {c.name.toUpperCase()}</ContactButton>
          <p className="contact-hint">
            Você será direcionado ao canal de contato oficial da ITACAPS.
          </p>
        </div>
      </section>
      <section className="collection-more">
        <span className="eyebrow">COMPLETE O VISUAL</span>
        <div>
          {categories
            .filter((item) => item.slug !== slug)
            .slice(0, 4)
            .map((item) => (
              <Link key={item.slug} href={`/colecao/${item.slug}`}>
                {item.name}
                <ArrowUpRight size={20} />
              </Link>
            ))}
        </div>
      </section>
      <TrustBar />
    </main>
  );
}
