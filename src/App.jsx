import React from 'react';
import {
    Page, withModel, EditorContext, Utils,
} from '@adobe/cq-react-editable-components';
import { ThemeProvider } from 'styled-components';
import { getTheme } from '#constants/styleConstants';
import SparkTheme from '#lib/SparkTheme';

import './fonts.css';

// This component is the application entry point
class App extends Page {
    render() {
        return (
            <SparkTheme>
                <ThemeProvider theme={getTheme()}>
                    <div>
                        <EditorContext.Provider value={Utils.isInEditor()}>
                            {this.childComponents}
                            {this.childPages}
                        </EditorContext.Provider>
                    </div>
                </ThemeProvider>
            </SparkTheme>
        );
    }
}

export default withModel(App);
