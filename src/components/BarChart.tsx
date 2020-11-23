import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IRootState } from '../reducers';
import {
  getNumericData,
  getAlphabeticData,
  getShownData,
} from '../actions/dataActions';
import { subArticle } from '../models/models';
import { styles } from '../styles/styles';
import Inputs from './Inputs';

import { types } from '../helper/stringTypes';
import { draw } from '../helper/draw';
import { cpuUsage } from 'process';

interface DispatchProps {
  getNumericData: () => void;
  getShownData: (
    data: Array<subArticle>,
    orderDirection: string,
    quantity: number
  ) => void;
  getAlphabeticData: (allData: Array<subArticle>) => void;
}
interface StateProps {
  allNumericData: Array<subArticle>;
  allAlphabeticData: Array<subArticle>;
  shownData: Array<subArticle>;
  onLoadingData: boolean;
}

const BarChart: React.FC<Props> = (props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [quantity, setQuantity] = React.useState<number>(50);
  const [orderType, setOrderType] = React.useState<string>(types.numeric);
  const [orderDirection, setOrderDirection] = React.useState<string>(
    types.ascending
  );

  useEffect(() => {
    if (props.allNumericData.length === 0) {
      props.getNumericData();
    }
  }, []);

  useEffect(() => {
    props.getShownData(props.allNumericData, orderDirection, quantity);
  }, [props.allNumericData]);

  useEffect(() => {
    props.getShownData(props.allAlphabeticData, orderDirection, quantity);
  }, [props.allAlphabeticData]);

  useEffect(() => {
    if (props.shownData.length > 0) {
      //first render is an empty array
      draw(props.shownData, svgRef);
    }
  }, [props.shownData]);

  useEffect(() => {
    let graphSvg = document.getElementById('graph_svg')!;
    switch (quantity) {
      case 10:
        graphSvg.setAttribute('width', '600');
        break;
      case 50:
        graphSvg.setAttribute('width', '1800');
        break;
      case 100:
        graphSvg.setAttribute('width', '3600');
        break;
    }
  }, [quantity]);

  useEffect(() => {
    if (
      orderType === types.alphabetic &&
      props.allAlphabeticData.length === 0 &&
      props.allNumericData.length > 0
    ) {
      props.getAlphabeticData(props.allNumericData);
      return;
    }

    orderType === types.numeric
      ? props.getShownData(props.allNumericData, orderDirection, quantity)
      : props.getShownData(props.allAlphabeticData, orderDirection, quantity);
  }, [quantity, orderDirection, orderType]);
  const changeQuantity = (event: any) => {
    setQuantity(event.target.value);
  };
  const changeOrderDirection = (event: any) => {
    setOrderDirection(event.target.value);
  };
  const changeOrderType = (event: any) => {
    setOrderType(event.target.value);
  };

  return (
    <div style={styles.main}>
      <Inputs
        quantityValue={quantity}
        order={orderDirection}
        handleQuantity={changeQuantity}
        changeOrderDirection={changeOrderDirection}
        orderTypeValue={orderType}
        changeOrderType={changeOrderType}
      ></Inputs>
      <svg
        ref={svgRef}
        id="graph_svg"
        width="1800"
        height="500"
        style={styles.container}
      ></svg>
    </div>
  );
};

const mapStateToProps = ({ data }: IRootState): StateProps => {
  const { allNumericData, allAlphabeticData, shownData, onLoadingData } = data;
  return { allNumericData, allAlphabeticData, shownData, onLoadingData };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    getNumericData: () => {
      dispatch(getNumericData());
    },
    getAlphabeticData: (allData) => {
      dispatch(getAlphabeticData(allData));
    },
    getShownData: (allData, orderDirection, quantity) => {
      dispatch(getShownData(allData, orderDirection, quantity));
    },
  };
};
export default connect(mapStateToProps, {
  getNumericData,
  getAlphabeticData,
  getShownData,
})(BarChart);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
