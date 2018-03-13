/*
 * Copyright (C) 2018 DANS - Data Archiving and Networked Services (info@dans.knaw.nl)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react"
import * as dateFormat from "dateformat"
import { DepositId, DeleteState, Deposit, DepositState } from "../../model/Deposits"
import { Link } from "react-router-dom"

function isEditable({ state }: Deposit): boolean {
    return state === DepositState.DRAFT || state === DepositState.REJECTED
}

interface DepositTableRowProps {
    depositId: DepositId
    deposit: Deposit
    deleting?: DeleteState
    deleteDeposit: () => void
}

const DepositTableRow = ({ depositId, deposit, deleting, deleteDeposit }: DepositTableRowProps) => {
    const editable = isEditable(deposit)

    const title = editable
        ? <Link to={`/deposit-form?datasetId=${depositId}`}>
            <i className="fas fa-sign-in-alt"
               id="enter_dataset"/> {deposit.title}
        </Link>
        : <span>
            <i className="fas fa-sign-in-alt"
               id="enter_dataset"
               style={{ visibility: "hidden" }}/> {deposit.title}
        </span>

    const deleteButton = editable &&
        <button key="delete"
                className="close icon"
                style={{ float: "unset" }}
                disabled={deleting && deleting.deleting}
                onClick={deleteDeposit}>
            <i className="fas fa-trash-alt"/>
        </button>
    // TODO add more action buttons here

    const actions = [
        deleteButton,
    ]

    return (
        <tr className={[
            "row",
            editable ? "" : "not_editable_table_row",
        ].join(" ")}>
            {/* these column sizes need to match with the sizes in DepositTableHead */}
            <td className="col col-12 col-sm-11 order-sm-1 col-md-3 order-md-1" scope="row">{title}</td>
            <td className="col col-12 col-sm-11 order-sm-3 col-md-2 order-md-2">{dateFormat(deposit.date, "yyyy-mm-dd")}</td>
            <td className="col col-12 col-sm-11 order-sm-4 col-md-2 order-md-3">{deposit.state}</td>
            <td className="col col-12 col-sm-11 order-sm-5 col-md-4 order-md-4">{deposit.stateDescription}</td>
            <td className="col col-12 col-sm-1  order-sm-2 col-md-1 order-md-5" id="actions_cell">{actions}</td>
        </tr>
    )
}

export default DepositTableRow
