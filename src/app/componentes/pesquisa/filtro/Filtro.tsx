import DOMPurify from 'dompurify';

interface FilterSectionProps {
  title: string;
  items: string[];
  selected: string;
  onChange: (val: string) => void;
  toggle: boolean;
  setToggle: (val: boolean) => void;
}

export default function FilterSection({
  title,
  items,
  selected,
  onChange,
  toggle,
  setToggle,
}: FilterSectionProps) {
  return (
    <div className="mb-6">
      <h2
        className="text-lg font-semibold mb-2 cursor-pointer lg:hidden"
        onClick={() => setToggle(!toggle)}
      >
        Filtrar por {title} {toggle ? "▲" : "▼"}
      </h2>
      <ul className={`${toggle ? "" : "hidden"} lg:block`}>
        <li
          className={`cursor-pointer ${selected === "" ? "font-bold" : ""}`}
          onClick={() => onChange("")}
        >
          Todos
        </li>
        {items.map((item) => (
          <li
            key={item}
            className={`cursor-pointer ${selected === item ? "font-bold" : ""}`}
            onClick={() => onChange(item)}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
          />
        ))}
      </ul>
    </div>
  );
}
