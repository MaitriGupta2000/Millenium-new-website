import type { SpecGroup } from "@/lib/types";

export function SpecsTable({ groups }: { groups: SpecGroup[] }) {
  if (!groups.length) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {groups.map((group) => (
        <div key={group.title} className="rounded-2xl border border-[#E5E5E5] p-5">
          <p className="text-sm font-medium text-[#1A1A1A] mb-3 font-body">{group.title}</p>
          <ul className="space-y-2">
            {group.items.map((item) => {
              const idx = item.indexOf(":");
              const label = idx === -1 ? null : item.slice(0, idx).trim();
              const value = idx === -1 ? item : item.slice(idx + 1).trim();
              return (
                <li
                  key={item}
                  className="flex justify-between gap-3 text-sm border-b border-[#E5E5E5]/60 pb-2 last:border-0 last:pb-0 font-body"
                >
                  {label && <span className="text-[#737373] shrink-0">{label}</span>}
                  <span className={`text-[#1A1A1A] ${label ? "text-right" : ""}`}>{value}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
