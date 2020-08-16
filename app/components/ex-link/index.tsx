import React from 'react';

const shell = require('electron').shell;

interface Props {
  href: string
}

export default class ExLink extends React.Component<Props> {
  openLink = (href: string) => {
    shell.openExternal(href);
  };

  render() {
    const { href } = this.props;

    return (
      <a href="#" onClick={(e) => {
        e.preventDefault();
        this.openLink(href);
      }}>{href}</a>
    );
  }
}
