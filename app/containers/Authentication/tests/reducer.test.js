import { Map } from 'immutable';
import authenticationRedeucer from '../reducer';
import { userMe } from '../actions';

describe('Authentication reducer', () => {
  const userData = {
    staffId: -2,
    username: 'api',
    firstName: 'john',
    lastName: 'doe',
    activeCaseLoadId: 'LEI',
    accessRoles: [],
    staffRoles: [],
  }

  it('should return state with a user as a key worker', () => {
    const user = {
      ...userData,
      staffRoles: [
          { role: 'KW', roleDescription: 'Key Worker' },
      ],
    }
    const state = authenticationRedeucer(Map({}), userMe({ user }));
    const userState = state.get('user');
    
    expect(userState.isKeyWorker).toBe(true);
  });
  it('should return state with a user as a key worker admin', () => {
    const user = {
      ...userData,
      accessRoles: [
            { roleCode: 'KW_ADMIN', roleDescription: 'Key Worker Admin' },
      ],
    }
    const state = authenticationRedeucer(Map({}), userMe({ user }));
    const userState = state.get('user');
      
    expect(userState.isKeyWorkerAdmin).toBe(true);
  });
})