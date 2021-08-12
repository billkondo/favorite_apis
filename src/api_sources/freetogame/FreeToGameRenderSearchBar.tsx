import { Form, Select } from 'antd';

import FreeToGameForm from './FreeToGameForm';

const { Option } = Select;

const FreeToGameCategories = [
  'mmorpg',
  'shooter',
  'strategy',
  'moba',
  'racing',
  'sports',
  'social',
  'sandbox',
  'open-world',
  'survival',
  'pvp',
  'pve',
  'pixel',
  'voxel',
  'zombie',
  'turn-based',
  'first-person',
  'third-Person',
  'top-down',
  'tank',
  'space',
  'sailing',
  'side-scroller',
  'superhero',
  'permadeath',
  'card',
  'battle-royale',
  'mmo',
  'mmofps',
  'mmotps',
  '3d',
  '2d',
  'anime',
  'fantasy',
  'sci-fi',
  'fighting',
  'action-rpg',
  'action',
  'military',
  'martial-arts',
  'flight',
  'low-spec',
  'tower-defense',
  'horror',
  'mmorts',
];

const FreeToGameRenderSearchBar = (params?: {
  initialForm?: FreeToGameForm;
  names?: Array<string>;
}) => {
  const { initialForm = {}, names = ['platform', 'category', 'sortBy'] } =
    params || {};

  const {
    platform = '',
    category = '',
    sortBy = '',
  } = initialForm as FreeToGameForm;

  return (
    <>
      {names[0] && (
        <Form.Item label="Platform" name={names[0]} initialValue={platform}>
          <Select allowClear style={{ minWidth: 160 }} placeholder="PC">
            <Option value="pc">PC</Option>
            <Option value="browser">Browser</Option>
            <Option value="all">All</Option>
          </Select>
        </Form.Item>
      )}

      {names[1] && (
        <Form.Item label="Category" name={names[1]} initialValue={category}>
          <Select allowClear style={{ minWidth: 160 }} placeholder="shooter">
            {FreeToGameCategories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      {names[2] && (
        <Form.Item name="sortBy" label={names[2]} initialValue={sortBy}>
          <Select allowClear style={{ minWidth: 160 }}>
            <Option value="release-date">Release Date</Option>
            <Option value="alphabetical">Alphabetical</Option>
            <Option value="relevance">Relevance</Option>
          </Select>
        </Form.Item>
      )}
    </>
  );
};

export default FreeToGameRenderSearchBar;
