import { Reveal } from "./Reveal";
import { testimonials } from "@/lib/data";
import Image from "next/image";


export function TestimonialsSection() {
  return (
    <section className="py-24 bg-linear-to-bl from-[#16161D] via-[#0B0B0F] to-[#050507]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#E5E7EB]">
              Loved by Candidates
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
              See what our users have to say about their interview preparation
              experience.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="h-full p-8 rounded-2xl bg-[#0B0B0F] border border-[#1F1F2A] hover:border-[#374151] transition-colors duration-300 relative group flex flex-col">
                <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <p className="text-[#D1D5DB] text-base leading-relaxed mb-8 flex-1">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#1F1F2A]/50">
                  <Image
                    src={testimonial.imgUrl}
                    alt="profile"
                    width={48}
                    height={48}
                    unoptimized
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-[#E5E7EB] font-medium text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#9CA3AF] text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
