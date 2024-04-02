import React, { Component } from 'react';
import { variables } from './variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faArrowLeft, faArrowRight, faPenNib } from '@fortawesome/free-solid-svg-icons';export class User extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            users: [],
            filteredUsers: [], 
            modalTitle: "",
            UserId: 0,
            UserLastname: "",
            UserSurname: "",
            UserAge: "",
            UserGender: "",
            UserCity: "",
            nextPage: null ,
            currentPage: 1, 
            totalPages: 0,
            filterLastname: "",
            filterSurname: "",
            filterAge: "",
            filterGender: "",
            filterCity: ""
        };
        this.loadNextPage = this.loadNextPage.bind(this);
    }
    
    componentDidMount() {
        this.refreshList();
    }

    changeFilterLastname = (e) => {
        this.setState({ filterLastname: e.target.value });
    }
    
    changeFilterSurname = (e) => {
        this.setState({ filterSurname: e.target.value });
    }
    
    changeFilterAge = (e) => {
        this.setState({ filterAge: e.target.value });
    }
    
    changeFilterGender = (e) => {
        this.setState({ filterGender: e.target.value });
    }
    
    changeFilterCity = (e) => {
        this.setState({ filterCity: e.target.value });
    }
    
    changeUserLastname = (e) => {
        this.setState({ UserLastname: e.target.value });
    }
    
    changeUserSurname = (e) => {
        this.setState({ UserSurname: e.target.value });
    }
    
    changeUserAge = (e) => {
        this.setState({ UserAge: e.target.value });
    }
    
    changeUserGender = (e) => {
        this.setState({ UserGender: e.target.value });
    }
    
    changeUserCity = (e) => {
        this.setState({ UserCity: e.target.value });
    }

    applyFilter = () => {
        const { filterLastname, filterSurname, filterAge, filterGender, filterCity } = this.state;
        let filterParams = [];
    
        // Build filter parameters based on filled fields
        if (filterLastname) filterParams.push(`last_name=${filterLastname}`);
        if (filterSurname) filterParams.push(`surname=${filterSurname}`);
        if (filterAge) filterParams.push(`age=${filterAge}`);
        if (filterGender) filterParams.push(`gender=${filterGender}`);
        if (filterCity) filterParams.push(`city=${filterCity}`);
    
        // Construct the filter URL with the filter parameters
        let filterURL = `${variables.API_URL}user/filter/?${filterParams.join('&')}`;
    
        // Fetch filtered users based on filter criteria
        fetch(filterURL)
            .then(response => response.json())
            .then(data => {
                if (data.users && Array.isArray(data.users)) {
                    this.setState({
                        filteredUsers: data.users,
                    });
                } else {
                    console.error("Bad format", data);
                }
            })
            .catch(error => {
                console.error("Error", error);
            });
    }
    
    
    addClick() {
        this.setState({
            modalTitle: "Ajouter un utilisateur",
            UserId: 0,
            UserLastname: "",
            UserSurname: "",
            UserAge: "",
            UserGender: "",
            UserCity: ""
        });
    }
    
    editClick(user) {
        this.setState({
            modalTitle: "Edit User",
            UserId: user.UserId,
            UserLastname: user.UserLastname,
            UserSurname: user.UserSurname,
            UserAge: user.UserAge,
            UserGender: user.UserGender,
            UserCity: user.UserCity
        });
    }
    
    createClick() {
        fetch(variables.API_URL + 'user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserLastname: this.state.UserLastname,
                UserSurname: this.state.UserSurname,
                UserAge: this.state.UserAge,
                UserGender: this.state.UserGender,
                UserCity: this.state.UserCity
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            });
    }
    
    updateClick() {
        fetch(variables.API_URL + 'user', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: this.state.UserId,
                UserLastname: this.state.UserLastname,
                UserSurname: this.state.UserSurname,
                UserAge: this.state.UserAge,
                UserGender: this.state.UserGender,
                UserCity: this.state.UserCity
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            });
    }
    
    deleteClick(id) {
        if (window.confirm('Êtes-vous sûr ? ')) {
            fetch(variables.API_URL + 'user/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                });
        }
    }
    
    refreshList() {
        fetch(variables.API_URL + 'user?page=' + this.state.currentPage)
            .then(response => response.json())
            .then(data => {
                if (data.results && Array.isArray(data.results)) {
                    this.setState({
                        users: data.results,
                        totalPages: Math.ceil(data.count / 5) //5 Users par page
                    });
                } else {
                    console.error("bad format", data);
                }
            })
            .catch(error => {
                console.error("Error", error);
            });
    }

    refreshFilteredList() {
        fetch(variables.API_URL + 'user')
            .then(response => response.json())
            .then(data => {
                if (data.results && Array.isArray(data.results)) {
                    this.setState({
                        filteredUsers: data.results,
                    });
                } else {
                    console.error("bad format", data);
                }
            })
            .catch(error => {
                console.error("Error", error);
            });
    }
    nextPage = () => {
        if (this.state.currentPage < this.state.totalPages) {
            this.setState(prevState => ({
                currentPage: prevState.currentPage + 1
            }), () => {
                this.refreshList();
            });
        }
    };
    
    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState(prevState => ({
                currentPage: prevState.currentPage - 1
            }), () => {
                this.refreshList();
            });
        }
    };
    
    

    loadNextPage = () => {
        if (this.state.nextPage) {
            fetch(this.state.nextPage)
                .then(response => response.json())
                .then(data => {
                    if (data.results && Array.isArray(data.results)) {
                        this.setState(prevState => ({
                            users: [...prevState.users, ...data.results], // Append new data to existing users
                            nextPage: data.next // Update nextPage if available
                        }));
                    } else {
                        console.error("error:", data);
                    }
                })
                .catch(error => {
                    console.error("Error fetching next page:", error);
                });
        }
    };
    
    render() {
        const {
            users,
            filteredUsers, 
            modalTitle,
            UserId,
            UserLastname,
            UserSurname,
            UserAge,
            UserGender,
            UserCity
        } = this.state;
    

        return (
            <div>
             {/* FILTRES */   }
             <div className="filter-section">
    <div className="row mb-4">
        <div className="col-md-4">
            <div className="input-group">
                <span className="input-group-text">Nom</span>
                <input type="text" className="form-control" placeholder="Nom" value={this.state.filterLastname} onChange={this.changeFilterLastname} />
            </div>
        </div>
        <div className="col-md-4">
            <div className="input-group">
                <span className="input-group-text">Prénom</span>
                <input type="text" className="form-control" placeholder="Prénom" value={this.state.filterSurname} onChange={this.changeFilterSurname} />
            </div>
        </div>
        <div className="col-md-4">
            <div className="input-group">
                <span className="input-group-text">Âge</span>
                <input type="text" className="form-control" placeholder="Âge" value={this.state.filterAge} onChange={this.changeFilterAge} />
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-4">
            <div className="input-group">
                <span className="input-group-text">Genre</span>
                <input type="text" className="form-control" placeholder="Genre" value={this.state.filterGender} onChange={this.changeFilterGender} />
            </div>
        </div>
        <div className="col-md-4">
            <div className="input-group">
                <span className="input-group-text">Ville</span>
                <input type="text" className="form-control" placeholder="Ville" value={this.state.filterCity} onChange={this.changeFilterCity} />
            </div>
        </div>
        <div className="col-md-4">
            <button className="btn btn-primary w-100" onClick={this.applyFilter}>Appliquer le filtre</button>
        </div>
    </div>
</div>



  {/*FILTRES */} 


                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                                     <FontAwesomeIcon icon={faPlus} />
    <span class="m-1">Ajouter un utilisateur</span>
                </button>




                {/* TABLEAU */}

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Age</th>
                            <th>Genre</th>
                            <th>Ville</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(!this.state.filterLastname && !this.state.filterSurname && !this.state.filterAge && !this.state.filterGender && !this.state.filterCity) ?
    // If no filtering criteria are applied, render users
    (users && users.map(user =>
        <tr key={user.UserId}>
            <td>{user.UserId}</td>
            <td>{user.UserLastname}</td>
            <td>{user.UserSurname}</td>
            <td>{user.UserAge}</td>
            <td>{user.UserGender}</td>
            <td>{user.UserCity}</td>
            <td>
                <button type="button"
                    className="btn btn-dark m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(user)}>
                    <FontAwesomeIcon icon={faPenNib} />
                </button>
                <button type="button"
                    className="btn btn-outline-danger m-1"
                    onClick={() => this.deleteClick(user.UserId)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    )) :
    // If filtering criteria are applied, render filteredUsers
    (filteredUsers && filteredUsers.map(user =>
        <tr key={user.UserId}>
            <td>{user.UserId}</td>
            <td>{user.UserLastname}</td>
            <td>{user.UserSurname}</td>
            <td>{user.UserAge}</td>
            <td>{user.UserGender}</td>
            <td>{user.UserCity}</td>
            <td>
                <button type="button"
                    className="btn btn-dark m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(user)}>
                    <FontAwesomeIcon icon={faPenNib} />
                </button>
                <button type="button"
                    className="btn btn-outline-danger m-1"
                    onClick={() => this.deleteClick(user.UserId)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </tr>
    ))
}
                    </tbody>
                </table>
                {/* TABLEAU */}

{/* FORMULAIRE DE UPDATE  */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
        <div className="p-2 w-50 bd-highlight">
            <div className="input-group mb-3">
                <span className="input-group-text">Nom</span>
                <input type="text" className="form-control"
                value={UserLastname}
                onChange={this.changeUserLastname}/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Prénom</span>
                <input type="text" className="form-control"
                value={UserSurname}
                onChange={this.changeUserSurname}/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Age</span>
                <input type="text" className="form-control"
                value={UserAge}
                onChange={this.changeUserAge}/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Genre</span>
                <input type="text" className="form-control"
                value={UserGender}
                onChange={this.changeUserGender}/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text">Ville</span>
                <input type="text" className="form-control"
                value={UserCity}
                onChange={this.changeUserCity}/>
            </div>
            
        </div>

    
    </div>
    

    {UserId === 0 ?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={() => this.createClick()}
        >Ajouter</button>
        : null}

    {UserId !== 0 ?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={() => this.updateClick()}
        >Mettre à jour</button>
        : null}
</div>

                        </div>
                    </div>
                </div>

               { /* FORMULAIRE DE UPDATE  */}




             {  /* PAGINATION  */} 
                <div className="d-flex justify-content-end">
    <div className="pagination">
        <button 
            type="button" 
            className="btn btn-sm btn-primary m-1" 
            onClick={this.prevPage}
            disabled={this.state.currentPage === 1}
        >
            <FontAwesomeIcon icon={faArrowLeft} /> 
        </button>
        <span className="page-info">Page {this.state.currentPage} sur {this.state.totalPages}</span>
        <button 
            type="button" 
            className="btn btn-primary btn-sm m-1" 
            onClick={this.nextPage}
            disabled={this.state.currentPage === this.state.totalPages}
        >
            <FontAwesomeIcon icon={faArrowRight} />    
        </button>
    </div>
</div>

{/* PAGINATION  */}


            </div>
            
        )
    }
}
