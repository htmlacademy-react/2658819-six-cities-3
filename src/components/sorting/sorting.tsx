import { useState } from 'react';
import { SortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSortType } from '../../store/action';

export function Sorting(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const activeSortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)} // Открываем/закрываем меню
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={`places__option ${type === activeSortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              dispatch(changeSortType({ type }));
              setIsOpen(false);
            }}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}
