import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pronostics Coupe du Monde 2026 | Molliet Lauper SA</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-4xl">⚽</span>
              <span className="text-xl font-bold text-amber-400">Molliet Lauper SA</span>
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-full hover:scale-105 transition-transform"
            >
              Se connecter
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
              Pronostiquez la <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Coupe du Monde 2026</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Rejoignez vos collègues dans un challenge passionnant. Pronostiquez les résultats, gagnez des points !
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/login"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-full text-lg hover:scale-105 transition-transform"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 bg-slate-800/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '48', label: 'Équipes' },
              { number: '104', label: 'Matchs' },
              { number: '16', label: 'Stades' },
              { number: '39', label: 'Jours' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-4">Comment ça marche ?</h2>
              <p className="text-xl text-slate-400">Trois étapes simples</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '1', title: 'Faites vos pronostics', desc: 'Pronostiquez avant chaque match' },
                { num: '2', title: 'Gagnez des points', desc: 'Score exact: 5 pts | Bon vainqueur: 2 pts' },
                { num: '3', title: 'Remportez le prix', desc: 'Le meilleur gagne le prix Molliet Lauper SA!' }
              ].map((step, i) => (
                <div key={i} className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-black text-slate-900 mb-6">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-400">© 2026 Molliet Lauper SA - Pronostics Coupe du Monde FIFA</p>
            <p className="text-slate-500 text-sm mt-2">🌎 Canada • États-Unis • Mexique | 📅 11 juin - 19 juillet 2026</p>
          </div>
        </footer>
      </div>
    </>
  );
}
