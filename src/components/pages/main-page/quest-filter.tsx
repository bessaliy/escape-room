import {ReactElement} from 'react';
import {LEVEL_FILTER_TYPES, QUEST_FILTER} from '../../../const.ts';

type QuestFilterProps = {
  activeType : string;
  activeLevel : string;
  onTypeChange: (type: string) => void;
  onLevelChange: (type: string) => void;
};

const levelsFilterOptions = Object.entries(LEVEL_FILTER_TYPES).map(
  ([type, label]) => ({
    type,
    label,
  })
);
const questsFilterOptions = Object.entries(QUEST_FILTER).map(
  ([type, {label, icon}]) => ({
    type,
    label,
    icon,
  })
);

function QuestFilter({activeType, activeLevel, onTypeChange, onLevelChange}: QuestFilterProps):ReactElement {
  return (
    <div className="filter">
      <fieldset className="filter__section">
        <legend className="visually-hidden">Тематика</legend>
        <ul className="filter__list">
          {questsFilterOptions.map((option) => (
            <li
              key={option.type}
              className="filter__item"
            >
              <input
                type="radio"
                name="type"
                id={option.type}
                checked={option.type === activeType}
                onChange={() => onTypeChange(option.type)}
              />
              <label className="filter__label" htmlFor={option.type}>
                <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                  <use href={`#icon-${option.icon}`}></use>
                </svg>
                <span className="filter__label-text">{option.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset className="filter__section">
        <legend className="visually-hidden">Сложность</legend>
        <ul className="filter__list">
          {levelsFilterOptions.map((option) => (
            <li
              key={option.type}
              className="filter__item"
            >
              <input
                type="radio" name="level"
                id={option.type}
                checked={option.type === activeLevel}
                onChange={() => onLevelChange(option.type)}
              />
              <label className="filter__label" htmlFor={option.type}><span className="filter__label-text">{option.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </div>
  );
}

export default QuestFilter;
