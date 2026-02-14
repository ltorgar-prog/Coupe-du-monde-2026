import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [prenom, setPrenom] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prenom.trim()) {
      localStorage.setItem('userName', prenom.trim());
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (!users[prenom]) {
        users[prenom] = { prenom, points: 0, predictions_count: 0 };
        localStorage.setItem('users', JSON.stringify(users));
      }
      router.push('/matches');
    }
  };

  return (
    <>
      <Head>
        <title>Connexion | Molliet Lauper SA</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <span className="text-6xl">⚽</span>
            <h1 className="text-4xl font-black text-white mb-2 mt-4">Molliet Lauper SA</h1>
            <p className="text-xl text-slate-400">Pronostics Coupe du Monde 2026</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-8">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">🏆 Bienvenue !</h2>
            <p className="text-slate-400 text-center mb-8">Entrez votre prénom</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Votre prénom"
                className="w-full px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 text-lg focus:outline-none focus:border-amber-400 mb-6"
                required
                autoFocus
              />
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-2xl text-lg hover:scale-105 transition-transform"
              >
                Commencer à pronostiquer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
