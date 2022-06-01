// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {useState} from "react";
import {heroesFetchingError, heroFilter} from "../../actions";
import {useHttp} from "../../hooks/http.hook";

const HeroesFilters = () => {
  const {filters} = useSelector(state => state);
  const [activeFilter, setActiveFilter] = useState('all');
  const dispatch = useDispatch();
  const {request} = useHttp();

  const filterHeroList = async (value) => {
    setActiveFilter(value);
    request(`http://localhost:3001/heroes?element=${value}`)
      .then(data => dispatch(heroFilter(data)))
      .catch(() => dispatch(heroesFetchingError()));
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map(({styleClass, caption, value}, index) => {
            return (<button
              key={index}
              className={classNames('btn', styleClass, {active: value === activeFilter})}
              onClick={() => filterHeroList(value)}
            >{caption}</button>)
          })}
        </div>
      </div>
    </div>
  )
}

export default HeroesFilters;