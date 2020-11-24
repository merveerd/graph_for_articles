import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AnyAction } from 'redux';

import { IRootState } from '../reducers';
import {
  getNumericData,
  setQuantity,
  setOrderType,
  setOrderDirection,
} from '../actions/dataActions';
import { subArticle } from '../models/models';
import { styles } from '../styles/styles';
import Inputs from './Inputs';
import { draw } from '../helper/draw';
import { getShown, getAlphabetic } from '../reducers/dataReducer';
//import { cpuUsage } from 'process';

interface DispatchProps {
  getNumericData: () => void;
  setQuantity: (quantity: number) => void;
  setOrderType: (orderType: string) => void;
  setOrderDirection: (orderDirection: string) => void;
}
interface StateProps {
  allNumericData: Array<subArticle>;
  allAlphabeticData: Array<subArticle>;
  shownData: Array<subArticle>;
  orderType: string;
  orderDirection: string;
  quantity: number;
}

export const BarChart: React.FC<Props> = (props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const {
    allNumericData,
    shownData,
    quantity,
    orderType,
    orderDirection,
  } = props;

  useEffect(() => {
    if (allNumericData.length === 0) {
      //to prevent rendering twice
      props.getNumericData();
    }
  }, []);

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
    if (shownData.length > 0) {
      //first render is an empty array
      draw(shownData, svgRef);
    }
  }, [shownData]);

  const changeQuantity = (event: any) => {
    props.setQuantity(event.target.value);
  };
  const changeOrderDirection = (event: any) => {
    props.setOrderDirection(event.target.value);
  };
  const changeOrderType = (event: any) => {
    props.setOrderType(event.target.value);
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
  const { allNumericData, orderType, orderDirection, quantity } = data;
  return {
    allNumericData,
    orderType,
    orderDirection,
    quantity,
    allAlphabeticData: getAlphabetic(data),
    shownData: getShown(data),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
  return {
    getNumericData: () => {
      dispatch(getNumericData());
    },

    setOrderDirection: (orderDirection) => {
      dispatch(setOrderDirection(orderDirection));
    },
    setQuantity: (quantity) => {
      dispatch(setQuantity(quantity));
    },

    setOrderType: (orderType) => {
      dispatch(setOrderType(orderType));
    },
  };
};
type Props = StateProps & DispatchProps;
export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
