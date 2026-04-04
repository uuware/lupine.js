import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { processStyle } from './bind-styles';

describe('CSS-in-JS Engine (bind-styles)', () => {

  it('should compile flat attributes wrapped in the top-level unique class name', () => {
    const cssObj = {
      color: 'red',
      backgroundColor: 'blue'
    };
    const result = processStyle('top-class', cssObj);
    assert.deepEqual(result, ['.top-class{color:red;background-color:blue;}']);
  });

  it('should compile flat attributes when topUniqueClassName is explicitly empty (e.g. themes)', () => {
    const cssObj = {
      '[data-theme="dark" i]': {
        color: 'black'
      }
    };
    const result = processStyle('', cssObj);
    assert.deepEqual(result, ['[data-theme="dark" i]{color:black;}']);
  });

  it('should correctly replace ampersand & with the topUniqueClassName in pseudo-classes', () => {
    const cssObj = {
      color: 'red',
      '&:hover': {
        color: 'green'
      }
    };
    const result = processStyle('top-class', cssObj);
    // Flat rules output first, nested blocks after
    assert.deepEqual(result, [
      '.top-class{color:red;}',
      '.top-class:hover{color:green;}'
    ]);
  });

  it('should correctly unfold nested multi-selectors (e.g. "&:hover, &.open" -> ">.d1, .d2")', () => {
    const cssObj = {
      '&:hover, &.open': {
        '>.d1, .d2': {
          color: 'purple'
        }
      }
    };
    const result = processStyle('top-class', cssObj);
    
    // '&:hover, &.open' replaces & with .top-class => '.top-class:hover, .top-class.open'
    // Then '>.d1, .d2' applies to each:
    // .top-class:hover >.d1, .top-class:hover .d2, .top-class.open >.d1, .top-class.open .d2
    assert.ok(result[0].startsWith('.top-class:hover >.d1,.top-class:hover .d2,.top-class.open >.d1,.top-class.open .d2{'));
    assert.ok(result[0].includes('color:purple;'));
  });

  it('should correctly process standalone descendant blocks (lines 148-158 mapping)', () => {
    const cssObj = {
      '.aa': {
        '&:hover': {
          color: 'yellow'
        },
        '.bb': {
          fontSize: '12px'
        }
      }
    };
    // No topUniqueClassName wrapper
    const result = processStyle('', cssObj);
    
    // .aa:hover
    assert.ok(result.includes('.aa:hover{color:yellow;}'));
    // .aa .bb
    assert.ok(result.includes('.aa .bb{font-size:12px;}'));
  });

  it('should accurately handle @media querying by wrapping internal rules recursively', () => {
    const cssObj = {
      width: '100%',
      '@media (max-width: 600px)': {
        width: '50%',
        '&:hover': {
          width: '60%'
        }
      }
    };
    const result = processStyle('container', cssObj);
    assert.ok(result.includes('.container{width:100%;}'));
    assert.ok(result.includes('@media (max-width: 600px){.container{width:50%;}}'));
    assert.ok(result.includes('@media (max-width: 600px){.container:hover{width:60%;}}'));
  });

  it('should properly compile @keyframes specifically retaining the stage identifiers without parent selector prepending', () => {
    const cssObj = {
      '@keyframes fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      }
    };
    const result = processStyle('box', cssObj);
    assert.deepEqual(result, [
      '@keyframes fade-in{0%{opacity:0;}100%{opacity:1;}}'
    ]);
  });
  it('should strictly ignore null, undefined, or empty string constraint declarations', () => {
    const cssObj = {
      color: 'red',
      backgroundColor: undefined,
      width: null,
      height: '',
    };
    const result = processStyle('null-test', cssObj as any);
    assert.deepEqual(result, ['.null-test{color:red;}']);
  });
});
