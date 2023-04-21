import { createContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [DayFilter, setDayFilter] = useState("Days");
  const [sort, setSort] = useState("asc");
  const [categoryUpdate, setCategoryUpdate] = useState(false);
  const updateDayFilter = (df) => {
    setDayFilter(df);
  };
  const isCategoryUpdated = (cu) => {
    setCategoryUpdate(cu);
  };

  const updateSort = (us) => {
    setSort(us);
  };

  return (
    <FilterContext.Provider
      value={{
        DayFilter,
        updateDayFilter,
        isCategoryUpdated,
        categoryUpdate,
        updateSort,
        sort,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterContext;
