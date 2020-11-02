import React, { Component } from 'react';
import { ProjectConfig } from 'config/project.config';
import { getIconByKey } from 'utils/icon';
import { calculateThemes } from 'utils/color';

class ConfigProvider extends Component {
  constructor(props) {
    super(props);
    const { initialConfig } = this.props;
    const {
      icons = {},
      defaultLanguage,
      color = {},
    } = { ...initialConfig }

    const themeOptions = Object.keys(color).map((value) => ({ value }));
    const calculatedThemes = calculateThemes(color);

    this.state = {
      icons,
      color: calculatedThemes,
      defaultLanguage,
      themeOptions,
    };
  }

  UNSAFE_componentWillUpdate(_, nextState) {
    const { color } = this.state;
    if (JSON.stringify(color) !== JSON.stringify(nextState.color)) {
      const themeOptions = Object.keys(nextState.color).map((value) => ({ value }))
      const calculatedThemes = calculateThemes(nextState.color)
      this.setState({
        themeOptions,
        color: calculatedThemes,
      })
    }
  }

  updateIcons = (icons = {}) => {
    this.setState((prevState) => ({
      ...prevState,
      icons: {
        ...prevState.icons,
        ...icons,
      }
    }))
  }

  removeIcon = (key) => {
    const iconObject = { [key]: getIconByKey(key)};
    this.updateIcons(iconObject);
  }

  updateColor = (color = {}) => {
    this.setState((prevState) => ({
      ...prevState,
      color: {
        ...prevState.color,
        ...color,
      }
    }))
  }

  removeTheme = (keys = []) => {
    const { color: prevColor } = this.state;
    const color = {}

    Object.entries(prevColor).forEach(([themeKey, theme]) => {
      if (!keys.includes(themeKey)) {
        color[themeKey] = theme;
      }
    })

    this.setState({
      color,
    })
  }

  render() {
    const { children } = this.props;
    const { icons, defaultLanguage, color, themeOptions } = this.state;
    const { updateIcons, removeIcon, updateColor } = this;

    return (
      <ProjectConfig.Provider
        value={{
          icons,
          color,
          themeOptions,
          updateIcons,
          updateColor,
          removeIcon,
          defaultLanguage,
        }}
      >
        {children}
      </ProjectConfig.Provider>
    );
  }
}
export default ConfigProvider;