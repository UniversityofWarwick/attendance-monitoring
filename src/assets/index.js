const renderAttendanceView = () => {
    const main = document.querySelector('#main');
    main.innerHTML = `
        <div class="attendance-view">
            <h2>Attendance Monitoring for ${localStorage.getItem('location')}</h2>
            <h2>Data stored in **</h2>
            <div class="attendance-view_columns">
            <div id="attendance-view_timestamp"></div>
            <div id="attendance-view_universityId"></div>
            <div id="attendance-view_issueNumber"></div>
            <div id="attendance-view_serialNumber"></div>
            </div>
    `;
    // every 500ms check if the data has changed and update if it has
    setInterval(() => {
        if (document.getElementById('attendance-view_timestamp').childElementCount !== electron.formattedData().length) {
            const timestampElement = document.createElement('p');
            timestampElement.innerHTML = electron.formattedData()[electron.formattedData().length - 1].timestamp;
            document.getElementById('attendance-view_timestamp').appendChild(timestampElement);
            const universityIdElement = document.createElement('p');
            universityIdElement.innerHTML = electron.formattedData()[electron.formattedData().length - 1].universityNumber;
            document.getElementById('attendance-view_universityId').appendChild(universityIdElement);
            const issueNumberElement = document.createElement('p');
            issueNumberElement.innerHTML = electron.formattedData()[electron.formattedData().length - 1].issueNumber;
            document.getElementById('attendance-view_issueNumber').appendChild(issueNumberElement);
            const serialNumberElement = document.createElement('p');
            serialNumberElement.innerHTML = electron.formattedData()[electron.formattedData().length - 1].serialNumber;
            document.getElementById('attendance-view_serialNumber').appendChild(serialNumberElement);
        }
    }, 500);
}

window.onbeforeunload = () => {
    // prevent window from closing
    event.returnValue = false;
    // ask the renderer process to save the data
    electron.saveAndClose();
}