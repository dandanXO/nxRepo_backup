import React, { useEffect, useState } from 'react';
import { injectIntl, FormattedMessage } from "react-intl";
import PropTypes from 'prop-types';

function TableTitle({ text }) {

    return <div>
        <div><FormattedMessage id={text} /></div>
        <div>(<FormattedMessage id='page.table.percentage' />)</div>
    </div>
}
TableTitle.PropTypes = {
    intl: PropTypes.object.isRequired,
}

export default injectIntl(TableTitle);
