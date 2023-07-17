import AppLayout from '@/Layouts/AppLayout'
import { Head } from '@inertiajs/react'
import React from 'react'
import { Badge, Table } from 'react-bootstrap'

const Voters = ({ auth, poll }) => {
	return (
		<AppLayout auth={auth} noBg>
			<Head title={poll.title + " | Voters"} />
			<section>
				<div className=" bg-dark w-100 py-4">
					<div className="container">
						<div className="d-flex justify-content-center align-items-center">
							<h3 className=' text-uppercase fw-bold me-2 text-light my-0'>Voters</h3>
							<div>
								<div className="circle-icon bg-light text-dark p-3">
									<i className=' bx bxs-user fs-5'></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<button type='button' onClick={() => history.back()} className='btn btn-light text-dark border mt-3'>
						<i className='bx bx-arrow-back '></i>
					</button>
					<div className="card mt-2 ">
						<div className="card-body p-xl-4 p-3">
							<h3 className='fw-bold'>{poll.title}</h3>
							<p>{poll.description}</p>
						</div>
					</div>
					<div className="card mt-3 ">
						<div className="card-header p-xl-3 p-3 bg-dark-purple text-light">
							<p className=' fw-bold text-uppercase my-0 '>List of users who join this poll.</p>
						</div>
						<div className="card-body p-xl-4 p-3 text-dark">
							<div className="table-responsive">
								<Table variant="l" bgcolor='dark-purple' align='middle' className=''>
									<thead>
										<tr>
											<th className=''>#</th>
											<th className=''>Firstname</th>
											<th className=''>Lastname</th>
											<th className=''>Has Voted</th>
										</tr>
									</thead>
									<tbody>
										{
											poll.participants.map((participant, index) => (
												<tr key={index}>
													<td className=' py-3 fw-medium'>{index + 1}</td>
													<td className=' py-3 fw-medium'>{participant.user.firstname}</td>
													<td className=' py-3 fw-medium'>{participant.user.lastname}</td>
													<td className=' py-3'>
														<i className={`bx fs-5 ${participant.has_voted ? ' text-success bxs-check-circle' : ' text-secondary bxs-minus-circle'}`}></i>
													</td>
												</tr>
											))
										}
									</tbody>
								</Table>
							</div>
						</div>
					</div>
				</div>
			</section>
		</AppLayout>
	)
}

export default Voters
