const webpack = require('webpack');

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            shared: share({
                '@angular/forms': {
                    // <-- This was missing
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: 'auto',
                    includeSecondaries: true,
                },
            }),
        }),
    ],
};
