export const hasPastDeadline = (deadline) =>{
    const deadlineDate = new Date(deadline);
    const todayDate = new Date();

    return todayDate.getTime() > deadlineDate.getTime();
}

 