'use client'

const SwiperSection: React.FC = () => (
    <section className="my-16">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-red-600">Testemunhos</h2>
            <p className="text-zinc-700">Veja o que dizem sobre a Comunidade Ágape:</p>
        </div>
        {/* Aqui você pode adicionar um carrossel real depois */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
            <div className="bg-zinc-100 rounded-lg p-6 shadow max-w-xs mx-auto">
                <p className="italic mb-2">'A Comunidade mudou minha vida e da minha família!'</p>
                <span className="block text-red-500 font-semibold">Maria S.</span>
            </div>
            <div className="bg-zinc-100 rounded-lg p-6 shadow max-w-xs mx-auto">
                <p className="italic mb-2">'Aqui encontrei um novo sentido para minha fé.'</p>
                <span className="block text-red-500 font-semibold">João P.</span>
            </div>
            <div className="bg-zinc-100 rounded-lg p-6 shadow max-w-xs mx-auto">
                <p className="italic mb-2">'O amor e acolhimento são incríveis.'</p>
                <span className="block text-red-500 font-semibold">Ana L.</span>
            </div>
        </div>
    </section>
);

export default SwiperSection;
