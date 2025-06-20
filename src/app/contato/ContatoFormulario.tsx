import React from "react";

export default function ContactForm() {
    return (
        <form className="w-full md:w-1/2 bg-white  p-6 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Entre em Contato</h2>
            <div className="mb-4"> <label className="block text-gray-700 mb-2" htmlFor="name"> Nome
            </label>
                <input className="w-full px-3 py-2 border rounded-md" type="text" id="name" name="name" required />
            </div> <div className="mb-4"> <label className="block text-gray-700 mb-2" htmlFor="email"> Email </label>
                <input className="w-full px-3 py-2 border rounded-md" type="email" id="email" name="email" required />
            </div> <div className="mb-4"> <label className="block text-gray-700 mb-2" htmlFor="message"> Mensagem </label>
                <textarea className="w-full px-3 py-2 border rounded-md" id="message" name="message" rows={4} required /> </div>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700" > Enviar </button>
        </form>);
}    