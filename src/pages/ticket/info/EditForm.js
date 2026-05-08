import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import DropDown from '../../../components/forms/Dropdown';
import { ticketOpt } from '../../../components/forms/Consts';
import { required, nonEmpty } from '../../../utils/validators';
import { updateInfo } from '../../../modules/ticket';

export function EditFormInfo({ onCancel }) {
    const dispatch = useDispatch();
    const ticketInfo = useSelector(s => s.ticket.ticketInfo);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            type: ticketInfo?.type,
            status: ticketInfo?.status,
            priority: ticketInfo?.priority,
            resolution: ticketInfo?.resolution,
        },
    });

    function onSubmit(values) {
        dispatch(updateInfo(values));
    }

    return (
        <form className="ticket-edit-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-6">
                <DropDown label="Type" options={ticketOpt.type} error={errors.type}
                    {...register('type', { validate: { required, nonEmpty } })} />
                <DropDown label="Priority" options={ticketOpt.priority} error={errors.priority}
                    {...register('priority', { validate: { required, nonEmpty } })} />
            </div>
            <div className="col-6">
                <DropDown label="Status" options={ticketOpt.status} error={errors.status}
                    {...register('status', { validate: { required, nonEmpty } })} />
                <DropDown label="Resolution" options={ticketOpt.resolution} error={errors.resolution}
                    {...register('resolution', { validate: { required, nonEmpty } })} />
            </div>
            <button type="submit" disabled={isSubmitting}>Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default EditFormInfo;
