import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { IRootState } from '../reducers';
import { getNumericData } from '../actions/dataActions';
import { subArticle } from '../models/models';
import { styles } from '../styles/styles';
import Inputs from './Inputs';
import { types } from '../helper/stringTypes';
import { draw } from '../helper/draw';

interface DispatchProps {
  getNumericData: () => void;
}
interface StateProps {
  allNumericData: Array<subArticle>;
  allAlphabeticData: Array<subArticle>;
  shownData: Array<subArticle>;
  onLoadingData: boolean;
}

const BarChart: React.FC<Props> = (props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [shownData, setShownData] = useState<Array<subArticle>>([]);
  const [quantity, setQuantity] = React.useState<number>(50);
  const [orderDirection, setOrderDirection] = React.useState<string>(
    types.ascending
  );

  const handleQuantity = (event: any) => {
    setQuantity(event.target.value);
  };

  useEffect(() => {
    if (props.allNumericData.length === 0) {
      props.getNumericData();
    }
  }, []);

  useEffect(() => {
    setShownData(props.allNumericData.slice(0, quantity));
  }, [props.allNumericData]);

  useEffect(() => {
    if (shownData.length > 0) {
      //first render is an empty array
      draw(shownData, svgRef);
    }
  }, [shownData]);

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

    orderDirection === types.ascending
      ? setShownData(props.allNumericData.slice(0, quantity))
      : setShownData(props.allNumericData.slice(-quantity));
  }, [quantity, orderDirection]);

  const changeOrder = (event: any) => {
    setOrderDirection(event.target.value);
  };

  return (
    <div style={styles.main}>
      <Inputs
        quantityValue={quantity}
        order={orderDirection}
        handleQuantity={handleQuantity}
        changeOrder={changeOrder}
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

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IRootState, void, AnyAction>
): DispatchProps => {
  return {
    //toparla asagisini
    getNumericData: async () => {
      await dispatch(getNumericData());
    },
  };
};
export default connect(mapStateToProps, { getNumericData })(BarChart);

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
