import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import inflection from 'inflection';
import compose from 'recompose/compose';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import { getResources, translate } from 'ra-core';

import DashboardMenuItem from './DashboardMenuItem';
import MenuItemLink from './MenuItemLink';
import Responsive from '../layout/Responsive';
import { DRAWER_WIDTH } from './Sidebar';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: DRAWER_WIDTH,
    },
};

const translatedResourceName = (resource, translate) =>
    translate(`resources.${resource.name}.name`, {
        smart_count: 2,
        _:
            resource.options && resource.options.label
                ? translate(resource.options.label, {
                      smart_count: 2,
                      _: resource.options.label,
                  })
                : inflection.humanize(inflection.pluralize(resource.name)),
    });

const Menu = ({
    classes,
    className,
    dense,
    hasDashboard,
    onMenuClick,
    resources,
    translate,
    logout,
    ...rest
}) => (
    <div className={classnames(classes.main, className)} {...rest}>
        {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
        {resources
            .filter(r => r.hasList)
            .map(resource => (
                <MenuItemLink
                    key={resource.name}
                    to={`/${resource.name}`}
                    primaryText={translatedResourceName(resource, translate)}
                    leftIcon={<resource.icon />}
                    onClick={onMenuClick}
                    dense={dense}
                />
            ))}
        <Responsive xsmall={logout} medium={null} />
    </div>
);

Menu.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    dense: PropTypes.bool,
    hasDashboard: PropTypes.bool,
    logout: PropTypes.element,
    onMenuClick: PropTypes.func,
    resources: PropTypes.array.isRequired,
    translate: PropTypes.func.isRequired,
};

Menu.defaultProps = {
    onMenuClick: () => null,
};

const mapStateToProps = state => ({
    resources: getResources(state),
});

const enhance = compose(
    translate,
    connect(
        mapStateToProps,
        {} // Avoid connect passing dispatch in props
    ),
    withStyles(styles)
);

export default enhance(Menu);
