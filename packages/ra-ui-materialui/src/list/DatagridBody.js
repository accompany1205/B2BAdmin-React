import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import TableBody from '@material-ui/core/TableBody';
import classnames from 'classnames';
import { ComponentPropType } from 'ra-core';

import DatagridRow from './DatagridRow';

const DatagridBody = ({
    basePath,
    children,
    classes,
    className,
    data,
    expand,
    hasBulkActions,
    hover,
    ids,
    isLoading,
    onToggleItem,
    resource,
    row: Row,
    rowClick,
    rowStyle,
    selectedIds,
    styles,
    version,
    ...rest
}) => (
    <TableBody className={classnames('datagrid-body', className)} {...rest}>
        {ids.map((id, rowIndex) =>
            <Row
                basePath={basePath}
                classes={classes}
                className={classnames(classes.row, {
                    [classes.rowEven]: rowIndex % 2 === 0,
                    [classes.rowOdd]: rowIndex % 2 !== 0,
                    [classes.clickableRow]: rowClick,
                })}
                expand={expand}
                hasBulkActions={hasBulkActions}
                hover={hover}
                id={id}
                key={id}
                onToggleItem={onToggleItem}
                record={data[id]}
                resource={resource}
                rowClick={rowClick}
                selected={selectedIds.includes(id)}
                style={rowStyle ? rowStyle(data[id], rowIndex) : null}
            >
                {children}
            </Row>
        )}
    </TableBody>
);

DatagridBody.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    data: PropTypes.object.isRequired,
    expand: ComponentPropType,
    hasBulkActions: PropTypes.bool.isRequired,
    hover: PropTypes.bool,
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    onToggleItem: PropTypes.func,
    resource: PropTypes.string,
    row: ComponentPropType,
    rowClick: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    rowStyle: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
    styles: PropTypes.object,
    version: PropTypes.number,
};

DatagridBody.defaultProps = {
    data: {},
    hasBulkActions: false,
    ids: [],
    row: DatagridRow,
};

const areArraysEqual = (arr1, arr2) =>
    arr1.length == arr2.length && arr1.every((v, i) => v === arr2[i]);

const PureDatagridBody = shouldUpdate(
    (props, nextProps) =>
        props.version !== nextProps.version ||
        nextProps.isLoading === false ||
        !areArraysEqual(props.ids, nextProps.ids) ||
        props.data !== nextProps.data
)(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
// @ts-ignore
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;
