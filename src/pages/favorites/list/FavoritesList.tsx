import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { Button, Divider, Form, Row, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { SearchOutlined } from '@ant-design/icons';

import { ApiSourcesMap } from 'api_sources';
import ApiSourceCheckboxes from 'api_sources/ApiSourceCheckboxes';
import ApiSourceCheckedFields from 'api_sources/ApiSourceCheckedFields';

import FavoriteButton from 'components/favorite_button/FavoriteButton';
type Props = {
  favoritesList: Array<any>;
  favoriteApiSourceKeys: Array<string>;

  done: boolean;
  loading: boolean;
};
const FavoritesList: FC<Props> = ({
  favoritesList = [],
  favoriteApiSourceKeys = [],
  done,
  loading,
}) => {
  const [checkedFields, setCheckedFields] = useState<{
    [key: string]: { [key: string]: string };
  }>({});
  const hasAnyCheckedField = useMemo(() => {
    for (const apiSourceKey of Object.keys(checkedFields))
      for (const key of Object.keys(checkedFields[apiSourceKey]))
        if (checkedFields[apiSourceKey][key]) return true;

    return false;
  }, [checkedFields]);

  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [filteredItems, setFilteredItems] = useState<Array<any>>(favoritesList);

  const size = favoritesList.length;

  useEffect(() => {
    setFilteredItems(
      favoritesList.filter((item) => {
        const apiSource = ApiSourcesMap[item.key];

        if (!apiSource) {
          console.warn('apiSource is undefined');
          return item;
        }

        return apiSource.filter(filters)(item);
      })
    );
  }, [favoritesList, filters]);

  // useEffect(() => {
  //   setFilters((filters) => {
  //     const newFilters = {
  //       ...filters,
  //     };
  //     const filterKeys = Object.keys(filters);

  //     // Add new checked inputs
  //     for (const checkedKey of checkedKeys)
  //       if (!newFilters[checkedKey]) newFilters[checkedKey] = '';

  //     // Remove unchecked inputs
  //     for (const filterKey of filterKeys)
  //       if (!checkedKeys.includes(filterKey)) delete newFilters[filterKey];

  //     return newFilters;
  //   });
  // }, [checkedKeys]);

  const onFilter = (form: any) => setFilters(form);

  return (
    <>
      <Row style={{ marginBottom: 24 }}>
        <Title level={2}>Your favorite items</Title>
      </Row>

      {loading && (
        <Row style={{ padding: 4 }}>
          <Spin size="large"></Spin>
        </Row>
      )}

      {done && (
        <>
          <Row style={{ padding: 4 }}>
            <Text>
              You have <b>{size}</b> favorited items
            </Text>
          </Row>

          <Form
            style={{ padding: 4, marginTop: 24 }}
            onValuesChange={(changed, values) => {
              setCheckedFields(values);
            }}
          >
            {favoriteApiSourceKeys.map((apiSourceKey) => {
              return (
                <Fragment key={apiSourceKey}>
                  <ApiSourceCheckboxes
                    apiSourceKey={apiSourceKey}
                  ></ApiSourceCheckboxes>
                </Fragment>
              );
            })}
          </Form>

          <Form
            layout="inline"
            style={{ padding: 4, marginTop: 24 }}
            hidden={!hasAnyCheckedField}
            onFinish={onFilter}
          >
            {favoriteApiSourceKeys.map((apiSourceKey) => {
              return (
                <Fragment key={apiSourceKey}>
                  <ApiSourceCheckedFields
                    apiSourceKey={apiSourceKey}
                    checkedFields={checkedFields[apiSourceKey]}
                  ></ApiSourceCheckedFields>
                </Fragment>
              );
            })}

            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
              ></Button>
            </Form.Item>
          </Form>

          <Row style={{ padding: 4, marginTop: 40 }}>
            <Text>
              <b>Filtered Results:</b> {filteredItems.length}
            </Text>
          </Row>

          {filteredItems.map((item) => {
            const apiSource = ApiSourcesMap[item.key];

            if (!apiSource) {
              console.warn('favorited item without api key');
              return <></>;
            }

            return (
              <div
                key={item.id}
                style={{ padding: 4, marginTop: 40, position: 'relative' }}
              >
                <FavoriteButton id={item.id} item={item}></FavoriteButton>

                <Row>{apiSource.renderItem(item)}</Row>

                <Row>
                  <Divider></Divider>
                </Row>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default FavoritesList;
