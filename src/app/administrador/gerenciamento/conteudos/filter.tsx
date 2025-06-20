import React from "react";

interface FilterFormProps {
    autor: string;
    data: string;
}

export default function FilterForm({ autor, data }: FilterFormProps) {
    return (
        <form className="flex gap-4 items-end mb-4">
            <div>
                <label
                    htmlFor="autor"
                    className="block text-sm font-medium text-gray-700"
                >
                    Autor
                </label>
                <input
                    type="text"
                    id="autor"
                    name="autor"
                    defaultValue={autor}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label
                    htmlFor="data"
                    className="block text-sm font-medium text-gray-700"
                >
                    Data
                </label>
                <input
                    type="date"
                    id="data"
                    name="data"
                    defaultValue={data}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
            >
                Filtrar
            </button>
        </form>
    );
}