import { FunctionComponent, ReactElement } from 'react';

import useReferenceArrayFieldController from './useReferenceArrayFieldController';
import { ListControllerProps } from '../useListController';
import { Record, Sort } from '../../types';

interface Props {
    basePath: string;
    filter?: any;
    page?: number;
    perPage?: number;
    record?: Record;
    reference: string;
    resource: string;
    sort?: Sort;
    source: string;
    children: (params: ListControllerProps) => ReactElement<any>;
}

/**
 * Render prop version of the useReferenceArrayFieldController hook.
 *
 * @see useReferenceArrayFieldController
 */
const ReferenceArrayFieldController: FunctionComponent<Props> = props => {
    const { children, ...rest } = props;
    const controllerProps = useReferenceArrayFieldController(rest);
    return children(controllerProps);
};

export default ReferenceArrayFieldController;
