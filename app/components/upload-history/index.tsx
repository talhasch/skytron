import React from 'react';

import { Modal } from 'react-bootstrap';

import { HistoryItem } from '../../store/queue/types';

import * as ls from '../../util/local-storage';

interface Props {
  onHide: () => void
}

interface State {
  data: HistoryItem[]
}

export default class UploadHistory extends React.Component<Props, State> {
  state: State = {
    data: []
  };

  componentDidMount() {
    const data: HistoryItem[] = ls.getByPrefix('history')
      .sort((a, b) => b.timestamp - a.timestamp) as HistoryItem[];

    this.setState({ data });
  }

  render() {
    const { onHide } = this.props;
    const { data } = this.state;

    console.log(data);

    return <Modal show={true} size="lg" onHide={onHide} centered={true} className="upload-history-modal">
      <Modal.Header closeButton={true}>
        <Modal.Title>Upload History</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>;
  }
}
