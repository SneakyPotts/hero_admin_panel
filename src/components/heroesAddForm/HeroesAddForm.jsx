// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import {useDispatch, useSelector} from "react-redux";
import {filtersFetched, filtersFetching, filtersFetchingError, heroCreate} from "../../actions";
import {v4 as genId} from 'uuid';
import {useEffect} from "react";
import {useHttp} from "../../hooks/http.hook";

const HeroesAddForm = () => {
  const {filters, filtersLoadingStatus} = useSelector(state => state);
  const dispatch = useDispatch();
  const {request} = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));
  }, []);


  const onCreateNewHero = (e) => {
    e.preventDefault();
    const newHeroData = {
      id: genId(),
      name: e.target.name.value,
      description: e.target.text.value,
      element: e.target.element.value
    }
    dispatch(heroCreate(newHeroData));
    e.target.reset();
    request("http://localhost:3001/heroes", "POST", JSON.stringify(newHeroData));
  }

  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={onCreateNewHero}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
        <input
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"/>
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">Описание</label>
        <textarea
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{"height": '130px'}}/>
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
        <select
          required
          className="form-select"
          id="element"
          name="element"
        >
          <option selected disabled hidden>Я владею элементом...</option>
          {filtersLoadingStatus === "loading"
            ? <option>Загрузка...</option>
            : filters.map(({value, caption}, index) => {
              if (value !== "all")
                return <option key={index} value={value}>{caption}</option>
            })}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Создать</button>
    </form>
  )
}

export default HeroesAddForm;