import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Leaderboard() {
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('userName');
    if (!user) {
      router.push('/login');
      return;
    }
    setUserName(user);

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const usersObj = JSON.parse(storedUsers);
      const usersArray = Object.values(usersObj).sort((a: any, b: any) => b.points - a.points);
      setUsers(usersArray);
    }
  }, [router]);

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  return (
    <>
      <Head>
        <title>Classement | Molliet Lauper SA</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-50">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-4xl">⚽</span>
              <span className="text-xl font-bold text-amber-400">Molliet Lauper SA</span>
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/matches" className="text-slate-400 hover:text-white">Matchs</Link>
              <Link href="/leaderboard" className="text-amber-400 font-semibold">Classement</Link>
              <Link href="/admin" className="text-slate-400 hover:text-white">Admin</Link>
              <span className="text-slate-400">👤 {userName}</span>
            </div>
          </nav>
        </header>

        <div className="pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black text-white mb-12 text-center">🏅 Classement des participants</h1>

            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900/50 border-b border-slate-700">
                    <th className="px-6 py-4 text-left text-white font-bold">Position</th>
                    <th className="px-6 py-4 text-left text-white font-bold">Participant</th>
                    <th className="px-6 py-4 text-center text-white font-bold">Points</th>
                    <th className="px-6 py-4 text-center text-white font-bold">Pronostics</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                        Aucun participant pour le moment. Soyez le premier à faire un pronostic !
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr 
                        key={index}
                        className={`border-b border-slate-700/50 hover:bg-slate-700/30 ${
                          user.prenom === userName ? 'bg-amber-500/10' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-3xl text-center">{getMedal(index)}</td>
                        <td className="px-6 py-4 text-white font-semibold">
                          {user.prenom}
                          {user.prenom === userName && (
                            <span className="ml-2 px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full font-bold">
                              Vous
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                          {user.points}
                        </td>
                        <td className="px-6 py-4 text-center text-slate-400">
                          {user.predictions_count}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-12 text-center p-8 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl border border-amber-500/30">
              <h2 className="text-3xl font-black text-white mb-2">🎁 Le gagnant remportera un prix</h2>
              <p className="text-amber-400 text-lg">offert par Molliet Lauper SA !</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
