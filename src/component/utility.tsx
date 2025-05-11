import Image from 'next/image';

export default function Utility() {
  return (
    <section
      className="relative z-10 py-16 px-6 md:px-12 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white"
      id="utility-section"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          ⚙️ Utility Smart Contracts
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Smart contract tambahan untuk fitur keamanan, kontrol, dan fleksibilitas maksimal. Dirancang untuk protokol yang ingin skalabilitas dan keamanan tingkat lanjut.
        </p>

        {/* Gambar atau GIF */}
        <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_#7f5af0] mb-12">
          <Image
            src="/assets/utility-contract-demo.gif" // ganti sesuai lokasi file
            alt="Utility Contract Flow"
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {[
            {
              title: '🕒 Timelock',
              desc: 'Eksekusi fungsi penting dengan jeda waktu, memungkinkan audit & transparansi.',
            },
            {
              title: '🚨 Emergency Withdraw',
              desc: 'Solusi darurat untuk menarik dana pengguna ketika terjadi situasi kritis.',
            },
            {
              title: '🛡️ Role Manager',
              desc: 'Pengaturan hak akses berbasis peran langsung dari smart contract.',
            },
            {
              title: '🧰 Solidity Utilities',
              desc: 'Fungsi helper untuk efisiensi gas dan manajemen internal kontrak.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-purple-500 bg-white/5 rounded-2xl p-6 backdrop-blur-lg shadow-[0_0_20px_#a855f7]/30 transition hover:scale-105 hover:shadow-[0_0_30px_#a855f7]/50"
            >
              <h3 className="text-2xl font-semibold mb-2 text-cyan-300">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Neon Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-purple-500 opacity-20 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
