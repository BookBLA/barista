import { colors } from '@commons/styles/variablesStyles';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Page from './openChatPage/Page';

interface ICarousel {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

const Container = styled.View`
  height: 80%;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`;

const Indicator = styled.View<{ focused: boolean }>`
  margin: 0px 4px;
  background-color: ${(props) => (props.focused ? colors.primary : colors.textGray)};
  width: ${(props) => (props.focused ? '9px' : '7px')};
  height: ${(props) => (props.focused ? '9px' : '7px')};
  border-radius: 10px;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

export default function Carousel({ pages, pageWidth, gap, offset }: ICarousel) {
  const [page, setPage] = useState(0);

  function renderItem({ item }: any) {
    return <Page item={item} style={{ width: pageWidth, marginHorizontal: gap / 2 }} />;
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / (pageWidth + gap));
    setPage(newPage);
  };

  return (
    <Container>
      <FlatList
        style={{ marginBottom: 10 }}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate={0.9999999999}
        horizontal
        keyExtractor={(item: any) => `page__${item.color}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
      <IndicatorWrapper>
        {Array.from({ length: pages.length }, (_, i) => i).map((i) => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </IndicatorWrapper>
    </Container>
  );
}
