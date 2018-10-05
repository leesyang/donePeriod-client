import React from 'react';
import prettyFileIcons from 'pretty-file-icons';

// ----- urls -----
import { AMZ_S3_URL } from '../config'

export default class FileList extends React.Component {
    render() {
        const { files } = this.props;
        console.log(files)

        let fileLinks = files? files.map((file, index) => { 
            const link = AMZ_S3_URL+file;
            const fileIcon = prettyFileIcons.getIcon(link, 'svg');
            return (
                <li key={index} className="attachment">
                    <a href={link} target="_blank"><img className="attachement-icon" src={AMZ_S3_URL+'icons/'+fileIcon}/></a>
                </li>
            )}) : undefined;

        return (
            <ul className="file-list">
                {fileLinks}
            </ul>
        )
    }
}